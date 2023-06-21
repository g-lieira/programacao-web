const User = require('../models/user');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { put } = require('../routes/user.routes');

module.exports = {

    createUsers: async(req, res) => {

        //verificando se o email já foi cadastrado
            User.findOne({
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
                            const novoUsuario = new User({
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
            const users = await User.findAll(); //findAll -> consulta SELECT para recuperar todas as entradas da tabela
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
            await User.destroy({
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
            const users = await User.findOne({
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

    updateMyUser: async(req, res) => {
        
        
        
        try {
            const name = req.params.name
            const {email, password} = req.body;
            let bearer = req.headers['authorization'] || ''
            let aux = bearer.split(' ')
            let token = ''
            if (aux[0] == 'Bearer') {
                token = aux[1]
            }
            if(!token){
                return res.status(401).json({
                    message: "Informe um token"
                })
            }

            jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
                if(err){
                    return res.status(401).json({
                        message: err
                    })
                }

                const usuario = await User.findOne({
                    where: {
                        name: decoded.name
                    }
                })

                if(usuario.name !== name){
                    return res.status(403).json({
                        message: "Proibido alterar dados de outro usuário"
                    })
                }

                
                const editUser = await User.findOne({
                    where: {name}
                });

                if(!editUser){
                    return res.status(401).json({
                        message: "Usuário não encontrado"
                    })
                }

                editUser.email = email;

                if(password){
                    const passHash = await bcrypt.hash(password, 10)
                    editUser.password = passHash
                }

                await editUser.save()
                res.status(200).json({
                    message: editUser
                })

            })
            
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
        
        
    },

    loginUsers: async(req, res) => {
        User.findOne({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        }).then(usuario => {
            if(!usuario){ 
                return res.status(401).json({ 
                    message: 'Falha na autenticação 1' 
                });
            }
            bcrypt.compare(req.body.password, usuario.password, (err, result) => {
                if(err || !result){
                    return res.status(401).json({
                        message: 'Falha na autenticação 2'
                    });
                }
                if(result){
                    const token = jwt.sign({
                        name: usuario.name,
                        email: usuario.email
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