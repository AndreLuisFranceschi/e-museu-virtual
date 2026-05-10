import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// [GET] Lista todas as categorias
router.get("/", (req, res) => {
  const sql = "SELECT * FROM categoria ORDER BY nome";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar categorias:", err);
      return res.status(500).json({ error: "Erro ao buscar categorias" });
    }
    res.json(results);
  });
});

// [GET] Busca uma categoria pelo ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM categoria WHERE id_categoria = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar categoria:", err);
      return res.status(500).json({ error: "Erro ao buscar categoria" });
    }
    if (!results || results.length === 0) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    res.json(results[0]);
  });
});

// [POST] Cadastra uma nova categoria
router.post("/", (req, res) => {
  const { nome } = req.body;
  if (!nome || !nome.trim()) {
    return res.status(400).json({ error: "Nome da categoria é obrigatório" });
  }
  const sql = "INSERT INTO categoria (nome) VALUES (?)";
  db.query(sql, [nome.trim()], (err, result) => {
    if (err) {
      console.error("Erro ao inserir categoria:", err);
      return res.status(500).json({ error: "Erro ao cadastrar categoria" });
    }
    res.status(201).json({ id_categoria: result.insertId, nome: nome.trim() });
  });
});

// [PUT] Atualiza uma categoria
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  if (!nome || !nome.trim()) {
    return res.status(400).json({ error: "Nome da categoria é obrigatório" });
  }
  const sql = "UPDATE categoria SET nome = ? WHERE id_categoria = ?";
  db.query(sql, [nome.trim(), id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar categoria:", err);
      return res.status(500).json({ error: "Erro ao atualizar categoria" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    res.json({ message: "Categoria atualizada com sucesso" });
  });
});

// [DELETE] Deleta uma categoria
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM categoria WHERE id_categoria = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar categoria:", err);
      // tratar erro de FK (dependendo do driver/versão)
      if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
        return res.status(409).json({
          error:
            "Não é possível deletar: existem equipamentos vinculados a esta categoria",
        });
      }
      return res.status(500).json({ error: "Erro ao deletar categoria" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    res.json({ message: "Categoria deletada com sucesso" });
  });
});

export default router;
