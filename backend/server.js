import express from "express";
import cors from "cors";
import loginRoutes from "./routes/login.js";
import membroRoutes from "./routes/membro.js";
import parceiroRoutes from "./routes/parceiro.js";
import categoriaRoutes from "./routes/categoria.js";
import exposicaoRoutes from "./routes/exposicao.js";
import imagensRoutes from "./routes/imagens.js";
import contatoRoutes from "./routes/contato.js";

const app = express();

// Middleware para permitir requisições de outros domínios (ex: frontend)
app.use(cors());

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Middleware para servir arquivos estáticos (imagens de perfil, etc.)
app.use("/uploads", express.static("uploads"));

// Rotas da aplicação
app.use("/login", loginRoutes); // Autenticação
app.use("/membros", membroRoutes); // Cadastro e gestão de membros
app.use("/parceiros", parceiroRoutes); // Dados dos parceiros
app.use("/categorias", categoriaRoutes); // Dados das categorias
app.use("/exposicao", exposicaoRoutes); // Dados das exposições
app.use("/imagens", imagensRoutes); // Upload e gestão de imagens
app.use("/contato", contatoRoutes); // Formulário de contato
app.use("/uploads", express.static("public/uploads")); // Servir arquivos públicos

// Inicialização do servidor
app.listen(3001, () => {
  console.log("🚀 Servidor rodando na porta 3001");
});
