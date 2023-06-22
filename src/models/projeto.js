const DataTypes = require("sequelize"); 

const sequelize = require("../database/database");
const tarefas = require('./tarefas');

//criação da tabela projetos
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
    timestamps: false
});


//relacionamento entre tabelas
projeto.hasMany(tarefas, {
    foreingKey: 'projetoId',
    sourceKey: 'id'
}); //projeto tem muitos de outro modelo, nesse caso tarefas

tarefas.belongsTo(projeto, {
    foreingKey: 'projetoId',
    targetId: 'id'
}); //tarefa tem apenas um outros modelo, nesse caso projeto

module.exports = projeto;