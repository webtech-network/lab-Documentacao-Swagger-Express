const express = require("express");
const crudController = require("../controllers/crud.controller");

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 * 
 */


/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Cria um post
 *     description: Essa rota cria um post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *           examples:
 *             post:
 *               value:
 *                 title: Post 1
 *                 content: Conteúdo do post 1
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Post created successfully
 *                 post:
 *                   id: 1
 *                   title: Post 1
 *                   content: Conteúdo do post 1
 *       400:
 *         description: Dados incorretos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Title and content are required
 */
router.post("/", crudController.save);


/**
 * @openapi
 * /posts:
 *   get:
 *     summary: Retorna todos os posts
 *     description: Essa rota retorna todos os posts disponíveis
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *               example:
 *                 - id: 1
 *                   title: Post 1
 *                   content: Conteúdo do post 1
 *                 - id: 2
 *                   title: Post 2
 *                   content: Conteúdo do post 2
 *       404:
 *         description: Nenhum post foi encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Nenhum post foi encontrado
 */
router.get("/", crudController.index);


/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     summary: Retorna um post
 *     description: Essa rota retorna um post pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Nenhum post foi encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Post não encontrado
 */
router.get("/:id", crudController.show);


/**
 * @openapi
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post
 *     description: Atualiza completamente um post pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *           examples:
 *             post:
 *               value:
 *                 title: Post atualizado
 *                 content: Conteúdo atualizado
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Post atualizado com sucesso
 *                 post:
 *                   id: 1
 *                   title: Post atualizado
 *                   content: Conteúdo atualizado
 *       404:
 *         description: Post não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Post não encontrado
 */
router.put("/:id", crudController.update);


/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     summary: Deleta um post
 *     description: Deleta um post pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Post deletado com sucesso
 *       404:
 *         description: Post não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Post não encontrado
 */
router.delete("/:id", crudController.destroy);


/**
 * @openapi
 * /docs-swagger:
 *   get:
 *     summary: Retorna a documentação em JSON da API
 *     description: Essa rota retorna a especificação Swagger gerada para a API
 *     tags: [Documentação-json]
 *     responses:
 *       200:
 *         description: Documentação da API
 *         content:
 *           application/json: {}
 *       404:
 *         description: Documentação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Documentação não encontrada
 */
router.get("/docs-swagger", (req, res) => {
  res.json(specs);
});

module.exports = router;
