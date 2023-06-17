const DataTypes = require("sequelize"); 

const sequelize = require("../database/database");
const tarefas = require('./tarefas');


const projeto = sequelize.define('projetos', { //define o nome da tabela
    //campos da tabela definidos abaixo
    // também é definido a caracteristica de cada campo
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    priority: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true
});

projeto.hasMany(tarefas, {
    foreingKey: 'projetoId',
    sourceKey: 'id'
}); //projeto tem muitos de outro modelo

tarefas.belongsTo(projeto, {
    foreingKey: 'projetoId',
    targetId: 'id'
}); //tarefa tem apenas um outros modelo

module.exports = projeto;