/**
 * @fileoverview CRUD API for managing posts using Express.js.
 * Provides endpoints to create, read, update, and delete posts in memory.
 * Each post contains an id, title, and content.
 *
 * @author Davi Cândido de Almeida
 * @github https://github.com/daviKandido
 */


const express = require("express");
const app = express();
const router = require("./routes/crud");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;

// Configurando o swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/v1/posts", router); 



// Rota para servir o arquivo swagger.json
app.get("/v1/docs-swagger", (req, res) => {
  res.sendFile(path.join(__dirname, "swagger.json"));
});

app.use((req, res) => {
  res.status(404).send({ message: "Page not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
