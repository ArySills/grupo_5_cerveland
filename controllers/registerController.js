
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
       /*
        let customerId = db.UserRoles.findAll({
            where: {
                id: 2
            }
        })
        console.log("Id customer:" + customerId)
        */

        db.Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword,
            profileImage: req.body.profileImage,
            id_role: '2'
		})
		.then(res.redirect('/'))
		.catch(function(error) {
			console.log(error)
		})
        
}}
module.exports = controlador;