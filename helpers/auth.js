const jwt = require('jsonwebtoken')

module.exports = {
    controlaAcesso: function (req, res, next) {
        let bearer = req.headers['authorization'] || ''
        let aux = bearer.split(' ')
        let token = ''
        if (aux[0] == 'Bearer') {
            token = aux[1]
        }

        jwt.verify(token, '1a2b3c4d', (err, obj) => {
            if (err) {
                return res.status(403).json({status:false, mensagem:"Acesso negado"})
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

        jwt.verify(tokenAdmin, 'e5f6g7h8', (err, obj) => {
            if (err) {
                return res.status(403).json({status:false, mensagem:"Acesso negado"})
            }
            req.user = obj.id
            next()
        })
    }
}