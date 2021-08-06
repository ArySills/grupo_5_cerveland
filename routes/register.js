const express = require ("express");
const router = express.Router();
const registerController = require ('../controllers/registerController');
const {check} = require ('express-validator');

router.get('/',registerController.detalle);
router.post('/',registerController.create);

module.exports = router;