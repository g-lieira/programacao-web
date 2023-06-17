const express = require('express');
const app = express();

const sequelize = require("./src/database/database");

/* var db = require("./src/database/database"), sequelize=db.sequelize; */

require("dotenv").config();

async function main() {
    try{
        await sequelize.authenticate();
        console.log("Conexão estabelecida");
        app.listen(3000);
        console.log("Running...");
    }catch (error) {
        console.error("erro bd", error);
    }
}

main();

