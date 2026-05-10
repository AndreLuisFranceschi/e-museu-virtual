import mysql from "mysql2";

// Cria a conexão com o banco
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySQLroot5647!",
  database: "emuseu",
});

// Estabelece a conexão e exibe status no console
db.connect((err) => {
  if (err) {
    console.error("❌ Erro ao conectar ao MySQL:", err.message);
    throw err;
  }
  console.log("✅ Conectado ao MySQL!");
});

export default db;
