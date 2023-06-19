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
const auth = require('../helpers/auth');

//salvar
router.post("/projetos", auth.controlaAcessoAdmin, createProjetos)

//pegar todos os projetos
router.get("/projetos", auth.controlaAcesso, getProjetos)

//atualizar um único projeto, precisa passar id 
router.put("/projetos/:id", auth.controlaAcessoAdmin, updateProjetos)

//deletar um único projeto, precisa passar o id
router.delete("/projetos/:id", auth.controlaAcessoAdmin, deleteProjetos)

//pegar um só projeto indicando o id
router.get("/projetos/:id", auth.controlaAcesso, getProjeto)

router.get("/projetos/:id/tasks", auth.controlaAcesso, getProjetoTarefa)

module.exports = router;