const user = require('../models/user');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    createUsers: async(req, res) => {

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
                            const novoUsuario = new user({
                                name: req.body.name,
                                email: req.body.email,
                                password: hash
                            });
                            novoUsuario
                            .save() 
                            .then(result => { //cadastro funcionou
                                console.log(result);
                                res.status(201).json({
                                    message: 'Usuario criado'
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
            
            })
            

        
        /*
        //cadastro de usuário sem criptografia(hash)
        try {
            const {name, email, password} = req.body;
            const novoUsuario = await user.create({
                name,
                email,
                password
            });

            res.json(novoUsuario);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
        */
        
    },

    getUsers: async(req, res) => {
        try{
            const users = await user.findAll(); //findAll -> consulta SELECT para recuperar todas as entradas da tabela
            res.json(users);
            
        }catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },

    deleteUsers: async(req, res) => {
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

    updateUsers: async(req, res) => {
        const {id} = req.params;

        try {
            const users = await user.findOne({
                where: {id}
            });
            users.set(req.body);
            await users.save();
            return res.json(users);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },

    /*
    updateMyUser: async(req, res) => {
        const {id} = req.params;

        if (req.body.id !== parseInt(id)) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        
        try {
            const users = user.findOne({
                where: {id}
            });
            users.set(req.body);
            users.save();
            return res.json(users);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },*/

    loginUsers: async(req, res) => {
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
                    process.env.JWT_KEY,
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