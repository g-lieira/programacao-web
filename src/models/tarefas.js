const DataTypes = require("sequelize");

const sequelize = require("../database/database");

const tarefa = sequelize.define('tarefas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    done: {
        type: DataTypes.BOOLEAN
    }
}, {
    timestamp: true
});

module.exports = tarefa;