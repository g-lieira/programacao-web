require("dotenv").config();

const express = require("express");
const app = express();


app.get("/api", (req, res)=>{
    res.json({
        success: 1,
        message: "API REST"
    });

});

app.listen(process.env.APP_PORT, ()=>{
    console.log("Running...", process.env.APP_PORT);
});