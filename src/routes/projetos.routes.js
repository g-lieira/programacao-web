const express = require("express");
const {
    getProjetos,
    createProjetos,
    updateProjetos,
    deleteProjetos,
    getProjeto,
    getProjetoTarefa
} = require("../controllers/projetos.controller")

const router = express.Router();
const auth = require('../helpers/auth');

//salvar
router.post("/projetos", auth.controlaAcessoAdmin, createProjetos) //somente admin pode add novos projetos

//pegar todos os projetos
router.get("/projetos", auth.controlaAcesso, getProjetos) //usuário comuns podem ver os projetos

//atualizar um único projeto, precisa passar id 
router.put("/projetos/:id", auth.controlaAcessoAdmin, updateProjetos) //admins atualizam projetos

//deletar um único projeto, precisa passar o id
router.delete("/projetos/:id", auth.controlaAcessoAdmin, deleteProjetos) //admins deletam projetos

//pegar um só projeto indicando o id
router.get("/projetos/:id", auth.controlaAcesso, getProjeto) //todos pesquisam individual

//ver as tarefas relacionadas a aquele objeto
router.get("/projetos/:id/tasks", auth.controlaAcesso, getProjetoTarefa) //todos podem ver tarefas relacionadas

module.exports = router;