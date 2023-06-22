const tarefa = require('../models/tarefas');


module.exports = {

    //criação de registros
    createTarefas: async(req, res) => {

        try {
            const {name, done, projetoId} = req.body;
            const novaTarefa = await tarefa.create({
                projetoId,
                name,
                done
            });

            res.json(novaTarefa);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        
    },

    getTarefas: async(req, res) => {
        
        const {limite, pagina} = req.query;

        try {
            //calcular o deslocamento offset com base na página e no limite
            const offset = (pagina-1)*limite;
            //offset -> determina a partir de qual registro a consulta deve retornar dados

            const tarefas = await tarefa.findAll({ //findAll -> gera um consulta SELECT para recuperar todas as entradas da tabela
                //restringindo a busca do findAll
                limit: limite,
                offset: offset
            });
            res.json(tarefas)

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
        
        /*
        //ver todos os registros sem limite e página
        try {
            const tarefas = await tarefa.findAll();
            res.json(tarefas);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }*/
    },

    //atualização de dados (teste de maneira diferente)
    updateTarefas: async(req, res) => {
        const {id} = req.params;

        try {
            const task = await tarefa.findOne({
                where: {id}
            });
            task.set(req.body); //pega os dados escritos no body
            await task.save();
            return res.json(task);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

    deleteTarefas: async(req, res) => {
        const {id} = req.params;
        try {
            await tarefa.destroy({
                where: { id }
            });
            return res.sendStatus(204);
        } catch (error) {
            return res.sendStatus(500).json({
                message: error.message
            });
        }
    },

    getTarefa: async(req, res) => {
        const {id} = req.params;
        try {
            const task = await tarefa.findOne({
                where: { id },
                attributes: ['name'] //retorna somente o nome da tarefa
            });
            res.json(task)
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

}