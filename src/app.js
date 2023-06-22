require("dotenv").config();
const express = require('express');
const app = express();

const sequelize = require("./database/database");

//importando rotas
const projetosRoutes = require('./routes/projetos.routes');
const tarefasRoutes = require('./routes/tarefas.routes');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const installRoutes = require('./routes/install.routes');


//middlewares
app.use(express.json());

//chama as rotas
app.use(projetosRoutes);
app.use(tarefasRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use(installRoutes);




async function main(){
        await sequelize.sync({force: true});
        //sync -> cria campos não existentes, tipo para ver a ultima modificação feita
        //force -> toda vez exclui esses campos não existentes e cria novamente se true

        app.listen(process.env.APP_PORT, () => {
                console.log("running..PORT", process.env.APP_PORT)
        });
}

main();
