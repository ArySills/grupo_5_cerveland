
const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

    list: (req, res) => {
        db.Users.findAll()
            .then(function (users) {
                return res.status(200).json({
                    count: users.length,
                    users: users.map(user => {
                        return {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            userName: user.userName,
                            userEmail: user.userEmail,
                            profileImage: user.profileImage,
                            detail: req.originalUrl + '/' + user.id
                        }

                    }),
                    status: 200
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    detail: (req, res) => {

        db.Users.findByPk(req.params.id)
            .then(user => {
                //return res.render('users/myProfile', { user: user })
                return res.status(200).json({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userName: user.userName,
                    userEmail: user.userEmail,
                    profileImage: user.profileImage,
                    status: 200
                })
            })

    },
    guardar: (req, res) => {

        const lastUser = users[users.length - 1]; //Buscamos el último producto
        const userToCreate = req.body; //Guardamos el producto con todos sus atributos q se cargaron en el form, en una variable

        userToCreate.id = lastUser.id + 1; // Agregamos un id consecutivo ascendente al nuevo producto

        users.push(userToCreate); //Agregamos el nuevoproducto al array de productos

        fs.writeFileSync(productsFilePath, JSON.stringify(users, null, 2));

        res.redirect(303, '/')
    },
    save: (req, res) => {
        db.Users.update({

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            profileImage: req.body.profileImage
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(res.redirect('/user'))
            .catch(function (error) {
                console.log(error)
            })


    },
};
module.exports = controller;