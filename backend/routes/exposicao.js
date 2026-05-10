import express from "express";
import db from "../db/connection.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// ======================== ROTAS ========================

// [GET] Lista todos os equipamentos com imagem principal
router.get("/", (req, res) => {
  const sql = `
  SELECT 
    e.*, 
    c.nome AS nome_categoria,
    (
      SELECT url 
      FROM imagem 
      WHERE id_equipamento = e.id_equipamento 
      ORDER BY data_upload ASC 
      LIMIT 1
    ) AS imagem
  FROM equipamento e
  LEFT JOIN categoria c ON e.id_categoria = c.id_categoria
`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar equipamentos" });
    }
    res.status(200).json(results);
  });
});

// [POST] Cadastra novo equipamento
router.post("/", (req, res) => {
  const {
    modelo,
    marca,
    ano,
    moeda,
    preco,
    descricao,
    id_categoria,
    doador,
    mensagem_doador,
  } = req.body;

  const sql = `
  INSERT INTO equipamento (modelo, marca, ano, moeda, preco, descricao, id_categoria, doador, mensagem_doador)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
  const values = [
    modelo,
    marca,
    ano,
    moeda,
    preco,
    descricao,
    id_categoria,
    doador,
    mensagem_doador,
  ];

  db.query(sql, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao adicionar equipamento" });
    }
    res.status(201).json({
      message: "Equipamento adicionado com sucesso!",
      id: results.insertId,
    });
  });
});

// [GET] Busca um equipamento específico pelo ID com imagem principal
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      e.*, 
      (
        SELECT url 
        FROM imagem 
        WHERE id_equipamento = e.id_equipamento 
        ORDER BY data_upload ASC 
        LIMIT 1
      ) AS imagem
    FROM equipamento e
    WHERE id_equipamento = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erro interno ao buscar equipamento" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Equipamento não encontrado" });
    }
    res.status(200).json(results[0]);
  });
});

// [PUT] Atualiza um equipamento existente
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    modelo,
    marca,
    ano,
    moeda,
    preco,
    descricao,
    id_categoria,
    doador,
    mensagem_doador,
  } = req.body;

  const sql = `
  UPDATE equipamento 
  SET modelo=?, marca=?, ano=?, moeda=?, preco=?, descricao=?, id_categoria=?, doador=?, mensagem_doador=?
  WHERE id_equipamento=?
`;

  db.query(
    sql,
    [
      modelo,
      marca,
      ano,
      moeda,
      preco,
      descricao,
      id_categoria,
      doador,
      mensagem_doador,
      id,
    ],
    (err) => {
      if (err) return res.status(500).json({ error: "Erro ao atualizar" });
      res.status(200).json({ message: "Equipamento atualizado com sucesso!" });
    }
  );
});

// [DELETE] Deleta um equipamento e suas imagens associadas
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sqlBuscarImagens = "SELECT url FROM imagem WHERE id_equipamento = ?";
  db.query(sqlBuscarImagens, [id], (err, resultados) => {
    if (err) {
      console.error("Erro ao buscar imagens:", err);
      return res.status(500).json({ error: "Erro ao buscar imagens" });
    }

    resultados.forEach(({ url }) => {
      const nomeArquivo = url.split("/").pop();
      const caminhoCompleto = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        nomeArquivo
      );

      fs.unlink(caminhoCompleto, (err) => {
        if (err) {
          console.error("Erro ao excluir arquivo:", caminhoCompleto, err);
        }
      });
    });

    const sqlDeleteImagens = "DELETE FROM imagem WHERE id_equipamento = ?";
    db.query(sqlDeleteImagens, [id], (err) => {
      if (err) {
        console.error("Erro ao deletar imagens:", err);
        return res.status(500).json({ error: "Erro ao deletar imagens" });
      }

      const sqlDeleteEquipamento =
        "DELETE FROM equipamento WHERE id_equipamento = ?";
      db.query(sqlDeleteEquipamento, [id], (err) => {
        if (err) {
          console.error("Erro ao deletar equipamento:", err);
          return res.status(500).json({ error: "Erro ao deletar equipamento" });
        }

        res
          .status(200)
          .json({ message: "Equipamento e arquivos deletados com sucesso!" });
      });
    });
  });
});

export default router;
