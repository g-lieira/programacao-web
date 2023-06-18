const projeto = require("../models/projeto");
const tarefa = require("../models/tarefas");


//exporta para routes/projetos.routes.js
module.exports = {
    //ver todos os projetos adicionados
    getProjetos:  async(req, res) => {
        try{
            const projetos = await projeto.findAll(); //findAll -> consulta SELECT para recuperar todas as entradas da tabela
            res.json(projetos);
        }catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },

    //inserir novos projetos
    createProjetos:  async (req, res) => {
        const {name, priority, description} = req.body;

        try {
            //cria o novo projeto
            const novoProjeto = await projeto.create({
                name,
                priority,
                description,
            });
    
            res.json(novoProjeto);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },

    //ver projeto já adicionado de forma individual
    getProjeto: async(req, res) => {
        const {id} = req.params; //recebe os id
        try {
            const project = await projeto.findOne({ //findOne -> obtem a primeira entrada que encontrar 
                where:{ //consultar individual pelo id
                    id,
                },
            });

            //caso o projeto não exista
            if(!project) return res.status(404).json({
                message: 'projeto não encontrado'
            })

            res.json(project);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

    

    //atualizar um projeto já existente
    updateProjetos: async (req, res) => {
        try {
            const {id} = req.params;
            const {name, priority, description} = req.body;
            const project = await projeto.findByPk(id); //findByPk -> obtem apenas uma entrada da tabela, usando a chave primária fornecida
            
            //atualizar para os novos dados
            project.name = name;
            project.priority = priority;
            project.description = description;

            await project.save();

            res.json(project);

        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },

    //deletar um projeto já existente
    deleteProjetos: async (req, res) => {
        const { id } = req.params; //recebe os id
        try {
            await projeto.destroy({ //método destroy para deletar
                where: {id}, //deletar por id
            });

            res.sendStatus(204) //204 -> não esta sendo enviado nenhuma resposta a qualquer json ou qualquer outra coisa
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },

    getProjetoTarefa: async(req, res) => {
        const {id} = req.params;
        try {
            const tarefas = await tarefa.findAll({
                where: {projetoId: id},
            });
            res.json(tarefas);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
        
    },

    getElementById: async(req, res) => {
        const {id} = req.params;
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return tarefa[pos];
        }
        return null;
    },
    getPositionById: async(req, res) => {
        const {id} = req.params;
        for (let i = 0; i<tasks.length; i++) {
            if (tasks[i].id == id) {
                return i;
            }
        }
        return -1;
    },

}

