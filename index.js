require("dotenv").config();
const express = require("express");
const morgan = require("morgan")
const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require("./swagger.json")

const app = express();
app.use(express.json());

const { connection, authenticate } = require("./database/database");
authenticate(connection); 

const rotasTurmas = require("./routes/turmas")
const rotasAlunos = require("./routes/alunos")
const rotasProfessores = require("./routes/professores")

app.use(rotasTurmas);
app.use(rotasAlunos);
app.use(rotasProfessores)

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(3000, () => {
    connection.sync({ force: true });
    console.log("Servidor rodando em http://localhost:3000");
})