import express from "express";
import db from "../db/connection.js";
import multer from "multer";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configuração do armazenamento de imagens com multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "uploads"), // pasta uploads na raiz
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ======================== ROTAS ========================

// [GET] Lista todos os parceiros
router.get("/", (req, res) => {
  db.query("SELECT * FROM parceiro", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar parceiros" });
    }
    res.json(results);
  });
});

// [POST] Cadastra novo parceiro
router.post("/", upload.single("imagem"), (req, res) => {
  const { nome, url_contato } = req.body;
  const img_parceiro = req.file ? req.file.filename : null;

  if (!nome || !url_contato) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  const sql =
    "INSERT INTO parceiro (nome, url_contato, img_parceiro) VALUES (?, ?, ?)";
  db.query(sql, [nome, url_contato, img_parceiro], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao cadastrar parceiro" });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// [PUT] Atualiza dados de um parceiro existente
router.put("/:id", upload.single("imagem"), (req, res) => {
  const { nome, url_contato, imagem } = req.body;
  const img_parceiro = req.file ? req.file.filename : imagem || null;

  const sql =
    "UPDATE parceiro SET nome = ?, url_contato = ?, img_parceiro = ? WHERE id_parceiro = ?";
  db.query(sql, [nome, url_contato, img_parceiro, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao atualizar parceiro" });
    }
    res.json({ success: true });
  });
});

// [DELETE] Remove um parceiro pelo ID e exclui a imagem associada
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Primeiro busca a imagem associada
  db.query(
    "SELECT img_parceiro FROM parceiro WHERE id_parceiro = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao buscar parceiro" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Parceiro não encontrado" });
      }

      const imagem = results[0].img_parceiro;

      // Exclui o registro do banco
      db.query("DELETE FROM parceiro WHERE id_parceiro = ?", [id], (err) => {
        if (err) {
          return res.status(500).json({ error: "Erro ao excluir parceiro" });
        }

        // Se houver imagem, tenta excluir o arquivo físico
        if (imagem) {
          const caminhoCompleto = path.join(__dirname, "..", "uploads", imagem);
          fs.unlink(caminhoCompleto, (err) => {
            if (err) {
              console.error("Erro ao excluir imagem:", caminhoCompleto, err);
            } else {
              console.log("Imagem excluída:", caminhoCompleto);
            }
          });
        }

        res.json({ success: true });
      });
    }
  );
});

export default router;
