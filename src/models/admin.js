const DataTypes = require("sequelize");

const sequelize = require("../database/database");


//criação da tabela de admin
const admins = sequelize.define("admins", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        //regex para que seja inserido um email válido
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: DataTypes.STRING,
        required: true
    }
}, {
    timestamps: false
});

module.exports = admins;