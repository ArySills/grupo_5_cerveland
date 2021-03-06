const express = require ("express");
const router = express.Router();
const registerController = require ('../controllers/registerController');
const {check} = require ('express-validator');
const multer = require ('multer');
const path = require ('path');

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/users'));
    },
    filename: (req, file, cb) => {
        
        const newFilename = 'user' + Date.now() + path.extname(file.originalname);

        console.log(newFilename)
        cb(null, newFilename);
    }
});

const fileUpload = multer ({storage});

const validations = [
    check('firstName').notEmpty().withMessage("Debes completar el campo Nombre").bail()
    .isLength({min: 2, max: undefined}).withMessage("El nombre debe tener al menos dos caracteres"),
    check('lastName').notEmpty().withMessage("Debes completar el campo Apellido").bail()
    .isLength({min: 2, max: undefined}).withMessage("El apellido debe tener al menos dos caracteres"),
    check('userName').notEmpty().withMessage("Debes completar el campo Nombre de Usuario"),
    check('userEmail').notEmpty().withMessage("Debes completar el campo Email").bail()
    .isEmail().withMessage('El email ingresado no es válido'),
    check('userEmail').custom(async(value, {req}) => {

        let resp = await registerController.emailAllowed(req.body.userEmail)

       if(!resp){
        throw new Error ("El email ingresado ya se encuentra registrado");
       }else {
           return true;
       }
    }),  
    check('userPassword').notEmpty().withMessage("Debes completar el campo contraseña").bail()
    .isLength({min: 8, max: 12}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('profileImage').custom((value, {req}) => {

        let file = req.file;
        

        let acceptedExtentions = ['.jpg', '.jpeg', '.png', '.gif'];
        
        if(!file){
            throw new Error('Tiene que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtentions.includes(fileExtension)){
               
                throw new Error(`Las extensiones de archivo permitidas son: ${acceptedExtentions.join(', ')}`)
            }
        }
        return true;
    })
]


router.get('/',registerController.detalle);
router.post('/',fileUpload.single('profileImage'), validations, registerController.create);

module.exports = router;