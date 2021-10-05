const express = require ("express");
const router = express.Router();
const loginController = require ('../controllers/loginController');
const {check} = require ('express-validator');

const validaciones = [
    check('userEmail').notEmpty().withMessage("Debes completar con un email valido").bail()
    .isEmail().withMessage("El email ingresado no es válido"),
    check('userEmail').custom(async(value, {req}) => {

        let resp = await loginController.emailExists(req.body.userEmail)

       if(!resp){
        throw new Error ("El email ingresado nose encuentra registrado");
       }else {
           return true;
       }
    }), 
    check('userPassword').notEmpty().withMessage("Debes completar el campo contraseña")
]

router.post('/', validaciones, loginController.login);

module.exports = router;

