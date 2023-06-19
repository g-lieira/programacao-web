const DataTypes = require("sequelize");

const sequelize = require("../database/database");

module.exports = {
    /*create: sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    }),*/

    create: (dados, retorna) => {
        sequelize.query (
            `insert into registration(name, genero, email, senha)
                    values(?, ?, ?, ?)`,
            [
                dados.name,
                dados.genero,
                dados.email,
                dados.senha
            ],
            (error, results, campos) => {
                if(error){
                    retorna(error);
                }
                return retorna(null, results)
            }
        );
    }

}