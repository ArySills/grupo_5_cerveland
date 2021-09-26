
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const bcryptjs = require ('bcryptjs');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {validationResult} = require ('express-validator')

let db = require('../database/models')

const controlador = {
    detalle: (req, res)=>{res.render('users/register')},
    create: (req, res) => { 

        let cryptedPass = bcryptjs.hashSync(req.body.userPassword, 10)
        const resultValidation = validationResult(req); // Esta funcion devuelve un objeto literal "errors" que tiene un array de errores.
        
        db.Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: cryptedPass,
            profileImage: req.body.profileImage,
            id_role: '2'
		})
		.then( user => {

            if(resultValidation.errors.length > 0) {
                return res.render('users/register', {
                    errors: resultValidation.mapped()
                });
            }
            req.session.usuarioLogueado = user
            res.redirect('/')
        })
		.catch(function(error) {
			console.log(error)
		})
        
}}
module.exports = controlador;