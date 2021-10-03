
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const bcryptjs = require ('bcryptjs');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {validationResult} = require ('express-validator');

let db = require('../database/models')

const controlador = {
    detalle: (req, res)=>{res.render('users/register')},
    create: (req, res) => { 

        let cryptedPass = bcryptjs.hashSync(req.body.userPassword, 10)
        const errors = validationResult(req); // Esta funcion devuelve un objeto literal "errors" que tiene un array de errores.
      
        // Antes de guardar el usuario debemos asegurarnos de que no tengamos ningun error de validacion
        if(!errors.isEmpty()) {

             res.render('users/register', { // Si encuentra errores renderizamos la vista y le pasamos los errores para que se muestren.
                errors: errors.mapped(),
                oldData: req.body
            });
        } else {

            db.Users.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                userEmail: req.body.userEmail,
                userPassword: cryptedPass,
                profileImage: req.file.filename,
                id_role: '2'
            })
            .then( user => {
                req.session.usuarioLogueado = user
                res.redirect('/')
            })
            .catch(function(error) {
                console.log(error)
            })
        }
    },
    
    emailAllowed:async (mail) => {
        db.Users.findOne({
            where: {userEmail: mail}
        })
        .then (email => {
            let response;
            
            if(email == null) {
                response = true;
            } else {
                response = false;
            }
            console.log(response + "respuesta del método")
            return response;
        })
        .catch(function(error) {
            console.log(error);
        })
    } 


}
module.exports = controlador;