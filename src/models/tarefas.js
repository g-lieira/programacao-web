const DataTypes = require("sequelize");

const sequelize = require("../database/database");


//criação da tabela tarefas
const tarefa = sequelize.define("tarefas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    timestamps: false
});

module.exports = tarefa;