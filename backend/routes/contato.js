import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// [GET] Lista todos os comentários
router.get("/", (req, res) => {
  db.query("SELECT * FROM contato ORDER BY data_envio DESC", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar comentários" });
    }
    res.json(results);
  });
});

// [POST] Recebe os dados do formulário de contato
router.post("/", (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  if (!nome || !email || !assunto || !mensagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const query = `
    INSERT INTO contato (nome, email, assunto, mensagem, data_envio, respondida)
    VALUES (?, ?, ?, ?, NOW(), 0)
  `;

  db.query(query, [nome, email, assunto, mensagem], (err) => {
    if (err) {
      console.error("Erro ao inserir:", err);
      return res
        .status(500)
        .json({ error: "Erro ao salvar no banco de dados." });
    }
    res.status(200).json({ message: "Mensagem enviada com sucesso!" });
  });
});

// [PUT] Marca um comentário como respondido
router.put("/:id_contato", (req, res) => {
  const { id_contato } = req.params;
  const { respondida } = req.body;

  db.query(
    "UPDATE contato SET respondida = ? WHERE id_contato = ?",
    [respondida, id_contato],
    (err) => {
      if (err) {
        console.error("Erro ao atualizar:", err);
        return res.status(500).json({ error: "Erro ao atualizar status." });
      }
      res.status(200).json({ message: "Status atualizado com sucesso!" });
    }
  );
});

// [DELETE] Remove um comentário pelo ID
router.delete("/:id_contato", (req, res) => {
  const { id_contato } = req.params;

  db.query("DELETE FROM contato WHERE id_contato = ?", [id_contato], (err) => {
    if (err) {
      console.error("Erro ao excluir:", err);
      return res.status(500).json({ error: "Erro ao excluir comentário." });
    }
    res.status(200).json({ message: "Comentário excluído com sucesso!" });
  });
});

export default router;
