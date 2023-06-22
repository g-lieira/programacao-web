const projeto = require('../models/projeto');
const tarefa = require('../models/tarefas');
const user = require('../models/user');
const admin = require('../models/admin');

const sequelize = require("../database/database");
const bcrypt = require('bcrypt');

module.exports = {
    addAdmin: async(req, res) => {
        await sequelize.sync({force: true}) //cria a tabela
        try {
            user.findOne({ //verifica se esse email não ja existe
                where: {
                    email: "adminMaster@test.com"
                }
                
            }).then(existeAdmin => {
                if(existeAdmin){ //se encontrar admin significa que já existe o email
                    return res.status(409).json({ //409 significa que há conflitos
                        message: 'Email já existente' //nesse caso conflito de email já existente
                    });
                }
            })

            const password = "adminMaster"
            const passHash = await bcrypt.hash(password, 10) //criptografar a senha

            const addAdmin = await admin.create({ //criação do admin master (fixo)
                name: "Admin Master",
                email: "adminMaster@test.com",
                password: passHash
            })

            res.status(201).json(addAdmin)
            
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    },

    addUsers: async(req, res, next) => {
        await sequelize.sync({force: true}) //cria a tabela

        //adição de dados na tabela de usuários
        const users = [
            {name: 'Gabriela', email: 'gabriela@test.com', password: 'gabitest'},
            {name: 'Maria', email: 'maria@test.com', password: 'mariatest'},
            {name: 'Julia', email: 'julia@test.com', password: 'juliatest'},
            {name: 'Talita', email: 'talita@test.com', password: 'talitatest'},
            {name: 'Maju', email: 'maju@test.com', password: 'majutest'}
        ];

        //criptografando as senhas
        const userHash = await Promise.all( 
            users.map(async (usuario) => {
                const hash = await bcrypt.hash(usuario.password, 10)
                return {...usuario, password: hash}
            })
        );


        await user.bulkCreate(userHash) //inserção de registro na tabela 
        .then(() => { //cadastro funcionou
            next(); 
        });
    },

    addProject: async(req, res, next) => {
        await sequelize.sync({force: true}) //cria a tabela


        //adição de dados na tabela projetos
        const projetos = [
            {name: 'Inception 3D', priority: 5, description: 'Blog sobre impressao 3D'},
            {name: 'Curious Cat', priority: 6, description: 'Site institucional sobre uma cafeteria'},
            {name: 'Zoo', priority: 1, description: 'Sistema web para gerenciamento de um zoologico'},
            {name: 'Amigo Cão', priority: 2, description: 'Sistema Web de um veterinario'},
            {name: 'Ta na Hora', priority: 8, description: 'Landing Page sobre relogios antigos'}
        ]

        await projeto.bulkCreate(projetos)
        .then(() => { //cadastro funcionou
            next();
        })
        .catch(err => { //cadastro não funcionou
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
       
    },

    addTasks: async (req, res, next) => {
        await sequelize.sync({force: true}) //cria a tabela

         //adição de dados na tabela tarefas
         const tarefas = [
            {projetoId: 1, name: 'Página de posts', done: false},
            {projetoId: 2, name: 'Página de sobre nós', done: true},
            {projetoId: 3, name: 'CRUD de funcionários', done: true},
            {projetoId: 3, name: 'CRUD dos animais', done: false},
            {projetoId: 4, name: 'Controle de entrada de animais', done: false}
        ]

        tarefa.bulkCreate(tarefas)
        .then(() => { //cadastro funcionou
            next();
        })
        .catch(err => { //cadastro não funcionou
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
       
    },
       
    
}