const { Op } = require("sequelize");
const Aluno = require("../database/aluno");
const { Router } = require("express");
const Turma = require("../database/turma");
const router = Router();


router.get("/alunos/:nome", async (req, res) => {
    try {
        const alunos = await Aluno.findAll({
            where: {
                nome: {
                    [Op.like]: `%${req.params.nome}%`
                }
            },
            order: [
                ['nome', 'ASC']
            ]
        })
        if(alunos.length > 0){
            res.status(200).json(alunos);
        } else {
            res.status(404).json({ message: "Nenhum aluno encontrado."});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});


router.get("/alunos", async (req, res) => {
    const alunos = await Aluno.findAll()
    res.status(200).json(alunos)
})

router.post("/alunos", async (req, res) => {
    const { nome, telefone, email, matricula, ano_ingresso, turmaId } = req.body;
    try {
        const alunoTurma = await Turma.findByPk( turmaId );
        if (alunoTurma){
            const novoAluno = await Aluno.create(
                { nome, telefone, email, matricula, ano_ingresso, turmaId });
                const resposta = {
                    alunoTurma,
                    novoAluno,
                };
                res.status(201).json(resposta);
        } else {
            res.status(404).json({ message: "Turma não encontrado." });
        }        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "um erro aconteceu." });
    }
});

router.put("/alunos/:matricula", async (req, res) => {
    const { nome, telefone, email, ano_ingresso } = req.body

    try {

    const editarAluno = await Aluno.findOne({ where: { matricula: req.params.matricula }})

    if(editarAluno){
        await editarAluno.update({nome, telefone, email, ano_ingresso})
        res.status(200).json(editarAluno)
    }else{
        res.status(404).json({ message: "Aluno não encontrado" })
    }
        
    } catch (err) {
        res.status(500).json({ message: "Um erro aconteceu" })
    }
})

router.delete("/alunos/:matricula", async (req, res) => {
    const { id } = req.params

    try {
        const deletarAluno = await Aluno.findOne({ where: { matricula: req.params.matricula }})

        if(deletarAluno){
            await deletarAluno.destroy()
            res.status(200).json({ message: "Aluno deletado com sucesso!" })
        }else{
            res.status(404).json({message: "Aluno não encontrado!"})
        }
    } catch (err) {
        res.status(500).json({ message: "Um erro aconteceu" })
    }
})


module.exports = router;