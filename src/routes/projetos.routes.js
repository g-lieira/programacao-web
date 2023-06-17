const express = require("express");
const {
    getProjetos,
    createProjetos,
} = require("../controllers/projetos.controller")

const router = express.Router();



//salvar
router.post("/projetos")

//pegar todos os projetos
router.get("/projetos", getProjetos)

//atualizar um único projeto, precisa passar id 
router.put("/projetos/:id", createProjetos)

//deletar um único projeto, precisa passar o id
router.delete("/projetos/:id")

//pegar um só projeto indicando o id
router.get("/projetos/:id")

module.exports = router;