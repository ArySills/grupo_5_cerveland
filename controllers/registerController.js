
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const bcryptjs = require ('bcryptjs');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {validationResult} = require ('express-validator')

const controlador = {
    detalle: (req, res)=>{res.render('users/register')},
    create: (req, res) => { 
        let errors = validationResult(req);
     
        const lastUser = users[users.length -1]; //Buscamos el último usuario
        const userToCreate = {
            ...req.body,
            userPassword: bcryptjs.hashSync(req.body.userPassword,10)} //Guardamos el usuario con todos sus atributos q se cargaron en el form, en una variable
        
        userToCreate.id = lastUser.id + 1; // Agregamos un id consecutivo ascendente al nuevo usuario

        users.push(userToCreate); //Agregamos el nuevo usuario al array de usuarios

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2)); 

        res.redirect(303,'/')
}}
module.exports = controlador;