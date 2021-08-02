const fs = require('fs');
const path = require('path');
const {validationResult} = require ('express-validator') 

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const controlador = {
    login: (req, res)=>{
        let errors = validationResult(req);
        if (!errores.isEmpty()){
            return res.render('users/register',{mensajeDeError: errors.mapped()})
        }else {res.redirect (303,'/')}}
}


   
    module.exports = controlador;