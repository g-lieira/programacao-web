const Sequelize = require("sequelize");

//banco de dados criado no pgadmin
const sequelize = new Sequelize('prog-web', 'postgres', 'glieira009', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;


/*var db = {}
db.sequelize = sequelize;
module.exports = db; //caso não funcione abaixo*/