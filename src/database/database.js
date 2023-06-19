const Sequelize = require("sequelize");

//banco de dados criado no pgadmin
const sequelize = new Sequelize(
    process.env.DB_NAME, //nome db
    process.env.DB_USER, //user
    process.env.DB_PASSWORD, //senha
    {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

module.exports = sequelize;


/*var db = {}
db.sequelize = sequelize;
module.exports = db; //caso não funcione abaixo*/