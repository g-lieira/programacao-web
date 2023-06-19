const admin = require('../models/admin');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    createAdmins: async(req, res) => {

        //verificando se o email já foi cadastrado
            user.findOne({
                where: {
                    email: req.body.email
                }
                
            }).then(existeUser => {
                if(existeUser){ //se encontrar usuário significa que já existe o email
                    return res.status(409).json({ //409 significa que há conflitos
                        message: 'Email já existente' //nesse caso conflito de email já existente
                    });
                }else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => { //hash para criptografar a senha
                        if(err){
                            return res.status(500).json({
                                error: err
                            });
                        } else {
                            //criando um novo usuario
                            const novoAdmin = new user({
                                name: req.body.name,
                                email: req.body.email,
                                password: hash
                            });
                            novoAdmin
                            .save() 
                            .then(result => { //cadastro funcionou
                                console.log(result);
                                res.status(201).json({
                                    message: 'Admin criado'
                                });
                            })
                            .catch(err => { //cadastro não funcionou
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
            
                        }
                    });
                    
                }
            
            });
        
    },

    deleteAdmins: async(req, res) => {
        const {id} = req.params;
        try {
            await user.destroy({
                where: { id }
            });
            return res.sendStatus(204);
        } catch (error) {
            return res.sendStatus(500).json({
                message: error.message
            });
        }
    },

    loginAdmins: async(req, res) => {
        user.findOne({
            where: {
                email: req.body.email
            }
        }).then(User => {
            if(!User){ 
                return res.status(401).json({ 
                    message: 'Falha na autenticação 1' 
                });
            }
            bcrypt.compare(req.body.password, User.password, (err, result) => {
                if(err || !result){
                    return res.status(401).json({
                        message: 'Falha na autenticação 2'
                    });
                }
                if(result){
                    const token = jwt.sign({
                        email: User.email
                    }, 
                    process.env.JWT_KEY_ADMIN,
                    {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: 'Autenticação sucedida',
                        token: token
                    })

                    
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }) 
    }


}