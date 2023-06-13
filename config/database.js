const { createPool } = require("postgresql");

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_ROOT,
    password: process.env.DB_PAS,
    database: process.env.MYSQL_DB,
    connectionLimit: "10"
});


module.exports = pool;


