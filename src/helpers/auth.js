const jwt = require('jsonwebtoken');


//controle de acessos às tabelas
module.exports = {

    controlaAcesso: function (req, res, next) {
        //verificação de token
        let bearer = req.headers['authorization'] || ''
        let aux = bearer.split(' ')
        let token = ''
        if (aux[0] == 'Bearer') {
            token = aux[1]
        }

        jwt.verify(token, process.env.JWT_KEY, (err, obj) => {
            if (err) {
                return res.status(403).json({status:false, mensagem:"Acesso negado"}) //token não aceito
            }
            req.user = obj.id
            next()
        })
    },
    controlaAcessoAdmin: function (req, res, next) {
        let bearer = req.headers['authorization'] || ''
        let aux = bearer.split(' ')
        let tokenAdmin = ''
        if (aux[0] == 'Bearer') {
            tokenAdmin = aux[1]
        }

        jwt.verify(tokenAdmin, process.env.JWT_KEY_ADMIN, (err, obj) => {
            if (err) {
                return res.status(403).json({status:false, mensagem:"Acesso negado"})
            }
            req.user = obj.id
            next()
        })
    }, 
    //adicionar adminEuser

    controlaAdminEuser: function (req, res, next) {
        let bearer = req.headers['authorization'] || ''
        let aux = bearer.split(' ')
        let token = ''
        if (aux[0] == 'Bearer') {
            token = aux[1]
        }

        jwt.verify(token, process.env.JWT_KEY, (err, obj) => {
            if (err) { //token não é equivalente ao de usuário
                jwt.verify(token, process.env.JWT_KEY_ADMIN, (err, obj) => {
                    if (err) { //token não é equivalente ao de admin 
                        return res.status(403).json({status:false, mensagem:"Acesso negado"}) //então não há login
                    }
                    req.user = obj.id
                    next()
                })
            } else {
                req.user = obj.id
                next()
            }
            
        })
    }

}