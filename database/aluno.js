const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Turma = require("./turma");


const Aluno = connection.define("aluno", {
    nome: {
        type: DataTypes.STRING(180),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    ano_ingresso: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
})


module.exports = Aluno;