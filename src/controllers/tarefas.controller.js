const tarefa = require('../models/tarefas');


module.exports = {

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
        try {
            const tarefas = await tarefa.findAll();
            res.json(tarefas);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

    updateTarefas: async(req, res) => {
        const {id} = req.params;

        try {
            const task = await tarefa.findOne({
                where: {id}
            });
            task.set(req.body);
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