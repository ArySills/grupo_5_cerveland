const express = require ("express");
const router = express.Router();
const registerController = require ('../controllers/registerController');
const {check} = require ('express-validator');
const multer = require ('multer');

const validaciones = [
    check('userName').notEmpty().withMessage("Debes completar el campo usuario"),
    check('userEmail').notEmpty().withMessage("Debes completar con un email valido"),
    check('userPassword').notEmpty().withMessage("Debes completar el campo contraseña")
]

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/users'));
    },
    filename: (req, file, cb) => {
        
        const newFilename = 'user' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const fileUpload = multer ({storage});

router.get('/',registerController.detalle);
router.post('/',fileUpload.single('profileImage'),registerController.create);

module.exports = router;