
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const controller= {
detail: (req, res)=>{
const id = req.params.id;
const user = users.find((us) => us.id == id);

const viewData = {
    user
}
return res.render('users/myProfile', viewData)
},
save: (req, res) => {         
    // ENCONTRAR EL INDICE DEL USUARIO EN EL ARRAY
    // EN BASE A SU ID
    const indiceDelUsuario = users.findIndex( user => user.id == req.params.id);

    // users[indice encontrado] == usuario en el array
    users[indiceDelUsuario] = { ...users[indiceDelUsuario] , ...req.body };

    // GUARDAR LA NUEVA BASE DE DATOS
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    // REDIRECCIONAR AL HOME
return res.send (users);
//res.redirect(303,'/');


},
};
module.exports = controller;