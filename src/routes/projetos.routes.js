const express = require("express");
const {
    getProjetos,
    createProjetos,
    updateProjetos,
    deleteProjetos,
    getProjeto,
    getProjetoTarefa,
    getElementById,
    getPositionById,
} = require("../controllers/projetos.controller")

const router = express.Router();

//salvar
router.post("/projetos", createProjetos, getElementById, getPositionById)

//pegar todos os projetos
router.get("/projetos", getProjetos)

//atualizar um único projeto, precisa passar id 
router.put("/projetos/:id", updateProjetos, getElementById, getPositionById)

//deletar um único projeto, precisa passar o id
router.delete("/projetos/:id", deleteProjetos, getElementById, getPositionById)

//pegar um só projeto indicando o id
router.get("/projetos/:id", getProjeto)

router.get("/projetos/:id/tasks", getProjetoTarefa)

module.exports = router;