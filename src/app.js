const express = require('express');
const app = express();
const projetosRoutes = require('./routes/projetos.routes');

//middlewares
app.use(express.json());

//chama as rotas
app.use(projetosRoutes);






//execução

const sequelize = require("./database/database");
// var db = require("./database/database"), sequelize=db.sequelize;

async function main() {
    try{
        await sequelize.sync({force: false});
        //sync -> cria campos não existentes, tipo para ver a ultima modificação feita
        //force -> toda vez exclui esses campos não existentes e cria novamente
        console.log("Conexão estabelecida");
        app.listen(3000);
        console.log("Running...");
    }catch (error) {
        console.error("erro bd", error);
    }
}
main();

