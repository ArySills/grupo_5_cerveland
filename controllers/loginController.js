const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')

//const usersFilePath = path.join(__dirname, '../data/users.json');
//const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const bcryptjs = require('bcryptjs');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let db = require('../database/models')

const controlador = {
    login: (req, res) => {

        let errors = validationResult(req);
        let userLogged = '';

        if (errors.isEmpty()) {

            db.Users.findAll({
                where: {
                  userEmail: req.body.userEmail
                }
              })
            .then( user => {
                console.log("Usuario de la base:" + {user: user})

                console.log("Contrasena del body:" + req.body.userPassword )
                console.log("Contrasena de la base:" + user.userPassword )


                if (req.body.userPassword == user.userPassword) {
                    userLogged = user;
                    console.log( "Usuario luego dela congtraseña:" + userLogged);
                }
                else {
                    userLogged = undefined;
                }

                if (userLogged == undefined) {
                    return res.render('users/register', { errors: [{ msg: 'Credenciales invalidas' }] })
                } 
                else {
                    req.session.usuarioLogueado = userLogged
                    return res.redirect(303, '/')
                }
            })

        }

        else { res.render('users/register', { errors: errors.errors }) }

    }

        /*

        let errors = validationResult(req);
        let userLogged = '';

        if (errors.isEmpty()) {

            console.log("No hay errores");

            let userToLogIn = db.Users.findAll({
                where: {
                  userEmail: req.body.userEmail
                }
              })
            console.log("Email del usuario:" + userToLogIn)

            if (bcryptjs.compareSync(req.body.userPassword, userToLogIn.userPassword)) {
                userLogged = userToLogIn;
                console.log(userLogged);
            }

            if(req.body.userPassword, userToLogIn.userPassword) {
                userLogged = userToLogIn;
                console.log(userLogged);
            }

            else userLogged = undefined;

            if (userLogged == undefined) {
                console.log(userLogged);
                return res.render('users/register', { errors: [{ msg: 'Credenciales invalidas' }] })
            } else {
                req.session.usuarioLogueado = userLogged
                return res.redirect(303, '/')
            }
        }

        else { res.render('users/register', { errors: errors.errors }) }
    }
    */
        
}



module.exports = controlador;