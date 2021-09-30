const express = require ("express");
const router = express.Router();
const loginController = require ('../controllers/loginController');
const {check} = require ('express-validator');

const validaciones = [
    check('userName').notEmpty().withMessage("Debes completar el campo usuario"),
    check('userEmail').notEmpty().withMessage("Debes completar con un email valido").bail()
    .isEmail().withMessage("El email ingresado no es válido"),
    //TODO: validar que el email exista en la base de datos
    check('userPassword').notEmpty().withMessage("Debes completar el campo contraseña")
]

router.post('/', validaciones, loginController.login);

module.exports = router;

