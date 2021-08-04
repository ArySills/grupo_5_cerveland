const express = require ("express");
const router = express.Router();
const loginController = require ('../controllers/loginController');
const {check} = require ('express-validator');

const validaciones = [
    check('userName').notEmpty().withMessage("Debes completar el campo usuario"),
    check('userEmail').notEmpty().withMessage("Debes completar con un email valido"),
    check('userPassword').notEmpty().withMessage("Debes completar el campo contraseña")
]

router.post('/', validaciones, loginController.login);

module.exports = router;

