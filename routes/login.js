const express = require ("express");
const router = express.Router();
const loginController = require ('../controllers/loginController');
const {check, body} = require ('express-validator');
const validaciones = [
    body('userName').notEmpty().withMessage("Debes completar el campo usuario"),
    body('userEmail').notEmpty().withMessage("Debes completar con un email valido"),
    body('userPassword').notEmpty().withMessage("Debes completar el campo contraseña")
]

router.post('/',validaciones,loginController.login);

module.exports = router;