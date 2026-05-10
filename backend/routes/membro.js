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
  destination: path.join(__dirname, "..", "uploads"), // pasta uploads na raiz do backend
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname; // Evita conflitos de nome
    cb(null, uniqueName);
  },
});

const upload = multer({ storage }); // Middleware para upload de arquivos

// ======================== ROTAS ========================

// [GET] Lista todos os membros
router.get("/", (req, res) => {
  db.query("SELECT * FROM membro", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar membros" });
    }
    res.json(results);
  });
});

// [POST] Cadastra novo membro
router.post("/", upload.single("imagem"), (req, res) => {
  const { nome, cargo } = req.body;
  const imagem = req.file ? req.file.filename : null;

  const sql = "INSERT INTO membro (nome, cargo, imagem) VALUES (?, ?, ?)";
  db.query(sql, [nome, cargo, imagem], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao cadastrar membro" });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// [PUT] Atualiza dados de um membro existente
router.put("/:id", upload.single("imagem"), (req, res) => {
  const { nome, cargo } = req.body;
  const imagem = req.file ? req.file.filename : req.body.imagem || null;

  const sql =
    "UPDATE membro SET nome = ?, cargo = ?, imagem = ? WHERE id_membro = ?";
  db.query(sql, [nome, cargo, imagem, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao atualizar membro" });
    }
    res.json({ success: true });
  });
});

// [DELETE] Remove um membro pelo ID e exclui a imagem associada
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Primeiro busca a imagem associada
  db.query(
    "SELECT imagem FROM membro WHERE id_membro = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao buscar membro" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Membro não encontrado" });
      }

      const imagem = results[0].imagem;

      // Exclui o registro do banco
      db.query("DELETE FROM membro WHERE id_membro = ?", [id], (err) => {
        if (err) {
          return res.status(500).json({ error: "Erro ao excluir membro" });
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
