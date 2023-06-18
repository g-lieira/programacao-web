const express = require("express");
const {
    getProjetos,
    createProjetos,
    updateProjetos,
    deleteProjetos,
    getProjeto,
} = require("../controllers/projetos.controller")

const router = express.Router();

//salvar
router.post("/projetos", createProjetos)

//pegar todos os projetos
router.get("/projetos", getProjetos)

//atualizar um único projeto, precisa passar id 
router.put("/projetos/:id", updateProjetos)

//deletar um único projeto, precisa passar o id
router.delete("/projetos/:id", deleteProjetos)

//pegar um só projeto indicando o id
router.get("/projetos/:id", getProjeto)

module.exports = router;