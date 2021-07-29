
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

    detail: (req, res)=>{
    const id = req.params.id;
    const user = users.find((us) => us.id == id);

    const viewData = {
        user
    }
    return res.render('users/myProfile', viewData)
    },
    guardar: (req, res) => { 

        const lastUser = users[users.length -1]; //Buscamos el último producto
        const userToCreate = req.body; //Guardamos el producto con todos sus atributos q se cargaron en el form, en una variable
        
        userToCreate.id = lastUser.id + 1; // Agregamos un id consecutivo ascendente al nuevo producto

        users.push(userToCreate); //Agregamos el nuevoproducto al array de productos

        fs.writeFileSync(productsFilePath, JSON.stringify(users, null, 2)); 

        res.redirect(303,'/')
    },
    save: (req, res) => {         
        // ENCONTRAR EL INDICE DEL USUARIO EN EL ARRAY
        // EN BASE A SU ID
        const indiceDelUsuario = users.findIndex( user => user.id == req.params.id);

        // users[indice encontrado] == usuario en el array
        const nuevosDatos = {
            ...req.body,
            profileImage: req.file.filename
        }
        users[indiceDelUsuario] = { ...users[indiceDelUsuario] , ...nuevosDatos };

        
        // GUARDAR LA NUEVA BASE DE DATOS
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        // REDIRECCIONAR AL HOME
   //return res.send (req.body);
    res.redirect(303,'/');


    },
};
module.exports = controller;