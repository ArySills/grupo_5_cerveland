const express = require ("express");
const router = express.Router();
const registerController = require ('../controllers/registerController');
const {check} = require ('express-validator');

const validaciones = [
    check('userName').notEmpty().withMessage("Debes completar el campo usuario"),
    check('userEmail').notEmpty().withMessage("Debes completar con un email valido"),
    check('userPassword').notEmpty().withMessage("Debes completar el campo contraseña")
]


router.get('/',registerController.detalle);
router.post('/',registerController.create);

module.exports = router;