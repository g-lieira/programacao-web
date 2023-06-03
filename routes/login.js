const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post("/login", (req, res) => {
    let {user, password} = req.body
    let expected = user + user
    if (expected == password) {
        let token = jwt.sign({id: user}, "1a2b3c4d", {expiresIn: "20 min"})
        res.json({status: true, token: token})
    } else {
        res.status(403).json({status:false, mensagem:'Senha incorreta'})
    }

    if(user == 'glieira' && password == 'lieirag') {
        let token = jwt.sign({id: user}, "e5f6g7h8", {expiresIn: "20 min"})
        res.json({status: true, token: token})
    } else {
        res.status(403).json({status:false, mensagem:'Senha incorreta'})
    }

})

module.exports = router