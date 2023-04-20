const Professor = require("../database/professor");
const Turma = require("../database/turma");
const { Router } = require("express");
const router = Router();



router.get("/turmas", async (req, res) => {
    const listaTurmas = await Turma.findAll();
    res.json(listaTurmas);
});

router.get("/turmas/:ano", async (req, res) => {
    try {
        const turmas = await Turma.findAll({
            where: { ano: req.params.ano }
        })
        if (turmas) {
            res.status(201).json(turmas);
        } else {
            res.status(404).json({ message: "Turma não encontrada." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "um erro aconteceu." });
    }
});

router.post("/turmas", async (req, res) => {
    const { ensino, periodo, turma, serie, ano, sala_aula, professorId } = req.body;
    try {
        const turmaProfessor = await Professor.findByPk(professorId)
        if (turmaProfessor) {
            const novaTurma = await Turma.create(
                { ensino, periodo, turma, serie, ano, sala_aula, professorId });
            const resposta = {
                novaTurma,
                turmaProfessor
            }
            res.status(201).json(resposta);
            
        } else { 
            res.status(404).json({ message: "Professor não encontrado." });

        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "um erro aconteceu." });
    }
});

router.put("/turmas/:id", async (req, res) => {
    const { ensino, periodo, turma, serie, ano, sala_aula } = req.body;
    const atualizarTurma = await Turma.findByPk(req.params.id);
    try {
        if (atualizarTurma) {
            await Turma.update(
                { ensino, periodo, turma, serie, ano, sala_aula },
                { where: { id: req.params.id } }
            );
            // await atualizarTurma.update( ensino, periodo, turma, serie, ano, sala_aula );
            res.status(201).json({ message: "Turma atualizada com sucesso;" })
        } else {
            res.status(404).json({ message: "Turma não encontrada." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "um erro aconteceu." });
    }
});

router.delete("/turmas/:id", async (req, res) => {
    const deletarTurma = await Turma.findByPk(req.params.id);
    try {
        if (deletarTurma) {
            await deletarTurma.destroy();
            res.status(200).json({ message: "Turma excluida com sucesso." })
        } else {
            res.status(404).json({ message: "Turma não encontrada." })
        }
    } catch {
        console.log(err);
        res.status(500).json({ message: "um erro aconteceu." });
    }
});



module.exports = router;