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

// Biblioteca para documentação
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc"); // commonjs
// Ou para
// const swaggerJSDoc from "swagger-jsdoc" // ES6

const router = require("./routes/crud");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;

// Configurando o swagger
const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger with Express",
      description:
        "Essa api tem como objetivo demonstra o uso do swagger com express",
      version: "1.0.0",
      license: {
        name: "MIT",
      },
      termsOfService: "http://localhost:3000/terms/",
      contact: {
        name: "Davi Cândido",
        email: "davicandidopucminas@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/v1",
        description: "Ambiente de desenvolvimento",
      },
      {
        url: "https://www.crudJourney.com/v2",
        description: "Ambiente de produção",
      },
    ],
  },
  apis: [path.join(__dirname, "./routes/*.js")],
};

// Configurando o swagger
const specs = swaggerJSDoc(option);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/v1/posts", router);

app.use((req, res) => {
  res.status(404).send({ message: "Page not found" });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
