import express from "express";
import multer from "multer";
import path from "path";
import db from "../db/connection.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    const nome = Date.now() + path.extname(file.originalname);
    cb(null, nome);
  },
});

const upload = multer({ storage });

// [GET] Lista imagens de um equipamento específico
router.get("/:id_equipamento", (req, res) => {
  const { id_equipamento } = req.params;
  const sql = `
    SELECT id_imagem, url, data_upload
    FROM imagem
    WHERE id_equipamento = ?
    ORDER BY data_upload DESC
  `;

  db.query(sql, [id_equipamento], (err, results) => {
    if (err) {
      console.error("Erro ao buscar imagens:", err);
      return res.status(500).json({ error: "Erro ao buscar imagens" });
    }
    res.status(200).json(results);
  });
});

// [GET] Imagens aleatórias com ID do equipamento para a home page
router.get("/aleatorias/:quantidade", (req, res) => {
  const { quantidade } = req.params;
  const sql = `
    SELECT id_imagem, url, id_equipamento
    FROM imagem
    ORDER BY RAND()
    LIMIT ?
  `;

  db.query(sql, [parseInt(quantidade)], (err, results) => {
    if (err) {
      console.error("Erro ao buscar imagens aleatórias:", err);
      return res
        .status(500)
        .json({ error: "Erro ao buscar imagens aleatórias" });
    }
    res.status(200).json(results);
  });
});

//[POST] Upload de imagem
router.post("/upload", upload.single("imagem"), (req, res) => {
  const { id_equipamento } = req.body;
  const url = `http://localhost:3001/uploads/${req.file.filename}`;
  const data_upload = new Date();

  const sql = `
    INSERT INTO imagem (id_equipamento, url, data_upload)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [id_equipamento, url, data_upload], (err) => {
    if (err) {
      console.error("Erro ao salvar imagem:", err);
      return res.status(500).json({ error: "Erro ao salvar imagem" });
    }
    res.status(201).json({ message: "Imagem salva com sucesso!" });
  });
});

// [DELETE] Excluir imagem por ID
router.delete("/:id_imagem", (req, res) => {
  const { id_imagem } = req.params;

  // Primeiro, buscar o caminho da imagem para excluir o arquivo físico
  const sqlSelect = "SELECT url FROM imagem WHERE id_imagem = ?";
  db.query(sqlSelect, [id_imagem], (err, results) => {
    if (err || results.length === 0) {
      console.error("Erro ao localizar imagem:", err);
      return res.status(404).json({ error: "Imagem não encontrada" });
    }

    const imageUrl = results[0].url;
    const filePath = path.join(
      "public",
      imageUrl.replace("http://localhost:3001/", "")
    );

    // Excluir do banco de dados
    const sqlDelete = "DELETE FROM imagem WHERE id_imagem = ?";
    db.query(sqlDelete, [id_imagem], (err) => {
      if (err) {
        console.error("Erro ao excluir imagem do banco:", err);
        return res.status(500).json({ error: "Erro ao excluir imagem" });
      }

      // Excluir o arquivo físico
      import("fs").then((fs) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.warn("Imagem excluída do banco, mas não do disco:", err);
            return res
              .status(200)
              .json({ message: "Imagem excluída (arquivo não encontrado)" });
          }
          res.status(200).json({ message: "Imagem excluída com sucesso!" });
        });
      });
    });
  });
});

export default router;
