const express = require('express');
const app = express();

//importando rotas
const projetosRoutes = require('./routes/projetos.routes');
const tarefasRoutes = require('./routes/tarefas.routes');


//middlewares
app.use(express.json());

//chama as rotas
app.use(projetosRoutes);
app.use(tarefasRoutes);







//execução

const sequelize = require("./database/database");
// var db = require("./database/database"), sequelize=db.sequelize;

async function main() {
        await sequelize.sync({force: true});
        //sync -> cria campos não existentes, tipo para ver a ultima modificação feita
        //force -> toda vez exclui esses campos não existentes e cria novamente
        app.listen(3000);
        console.log("Running...");
}
main();

