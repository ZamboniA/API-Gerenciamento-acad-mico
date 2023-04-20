const { Op } = require("sequelize");
const Professor = require("../database/professor");
const { Router } = require("express");
const router = Router();



router.get("/professor", async (req, res) => {
    const listaProfessores = await Professor.findAll();
    res.json(listaProfessores);
});

router.get("/professor/:nome", async (req, res) => {
    try {
        const professor = await Professor.findAll({
            where: {
                nome: {
                    [Op.like]: `%${req.params.nome}%`
                }
            },
            order: [
                ['nome', 'ASC']
            ]
        })
        if(professor.length > 0){
            res.status(200).json(professor);
        } else {
            res.status(404).json({ message: "Professor não encontrado."});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "um erro aconteceu." });
    }
});

router.post("/professor", async(req, res) => {
    const { nome, telefone, email } = req.body;
    try{
        const professor = await Professor.create(
            { nome, telefone, email }
        );
        res.status(201).json(professor);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "um erro aconteceu." });
    }
});

router.put("/professor/:id", async(req, res) => {
    const { nome, telefone, email } = req.body;
    const attProfessor = await Professor.findByPk(req.params.id);
    try{
        if(attProfessor) {
            await Professor.update(
                { nome, telefone, email },
                { where: { id: req.params.id}}            
            );
            res.status(201).json({ message: "Professor atualizado com sucesso;"})
        } else {
            res.status(404).json({ message: "Professor não encontrada."});
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "um erro aconteceu." });
    }
});

router.delete("/professor/:id", async (req,res) => {
    const deletarProfessor = await Professor.findByPk(req.params.id);
    try{
        if(deletarProfessor){
            await deletarProfessor.destroy();
            res.status(201).json({ message: "Professor excluido com sucesso." })
        }else{
            res.status(404).json({ message: "Professor não encontrada." })
        }
    }catch{
        console.log(err);
        res.status(500).json({ message: "um erro aconteceu." });
    }
});



module.exports = router;