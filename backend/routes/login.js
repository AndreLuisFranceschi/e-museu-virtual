import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// [POST] Autenticação de administrador
router.post("/", (req, res) => {
  const { email, senha } = req.body;

  // Busca o administrador pelo email
  const sql = "SELECT * FROM administrador WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erro interno ao buscar administrador" });
    }

    // Verifica se o email existe
    if (results.length === 0) {
      return res.status(401).json({ error: "Email não encontrado" });
    }

    const admin = results[0];

    // Verifica se a senha está correta
    if (admin.senha === senha) {
      return res.status(200).json({
        message: "Login autorizado!",
        token: "demo-token", // Token fictício — substituir por JWT em produção
      });
    } else {
      return res.status(401).json({ error: "Senha incorreta" });
    }
  });
});

export default router;
