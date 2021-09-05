const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const bcryptjs = require('bcryptjs');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controlador = {
    login: (req, res) => {

        let errors = validationResult(req);
        let userLogged = '';
        if (errors.isEmpty()) {
            console.log("No hay errores");
            for (let i = 0; i < users.length; i++) {
                console.log("Entro al for");
                if (users[i].userEmail == req.body.userEmail && bcryptjs.compareSync(req.body.userPassword, users[i].userPassword)) 
                {
                    userLogged = users[i];
                    console.log(userLogged);
                    break;
                }
                else userLogged = undefined;
            }
                if (userLogged == undefined) {
            console.log(userLogged);
            return res.render('users/register', { errors: [{ msg: 'Credenciales invalidas' }] })
        } else {
            req.session.usuarioLogueado = userLogged
            return res.redirect(303, '/')
        }
    }
        else { res.render('users/register', { errors: errors.errors }) }
}}


module.exports = controlador;