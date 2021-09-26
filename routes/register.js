const express = require ("express");
const router = express.Router();
const registerController = require ('../controllers/registerController');
const {check} = require ('express-validator');
const multer = require ('multer');

const validations = [
    check('firstName').notEmpty().withMessage("Debes completar el campo Nombre").bail()
    .isLength({min: 2, max: undefined}).withMessage("El nombre debe tener al menos dos caracteres"),
    check('lastName').notEmpty().withMessage("Debes completar el campo Apellido").bail()
    .isLength({min: 2, max: undefined}).withMessage("El apellido debe tener al menos dos caracteres"),
    check('userName').notEmpty().withMessage("Debes completar el campo Nombre de Usuario"),
    check('userEmail').notEmpty().withMessage("Debes completar el campo Email").bail()
    .isEmail().withMessage('El email ingresado no es válido'),
    check('userPassword').notEmpty().withMessage("Debes completar el campo contraseña").bail()
    .isLength({min: 8, max: 12}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('profileImage').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtentions = ['JPG', 'JPEG', 'PNG', 'GIF'];

        if(file) {
          let fileExtension = path.extname(file.originalname);
          if (!acceptedExtentions.includes(fileExtension)){
              throw new Error(`Las extensiones de archivo permitidas son: ${acceptedExtentions.join(', ')}`)
          }
        }
        return true;
    })
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
router.post('/',fileUpload.single('profileImage'), validations, registerController.create);

module.exports = router;