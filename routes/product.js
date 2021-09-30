const express = require ("express");
const router = express.Router();
const productController = require ('../controllers/productController');
const authMiddleware = require ('../middlewares/authMiddleware');
const {check} = require ('express-validator');


const createValidations = [
    check('productName').notEmpty().withMessage("Debes completar el campo Nombre").bail()
    .isLength({min: 5, max: undefined}).withMessage("El nombre debe tener al menos 5 caracteres"),
    check('productDescription').notEmpty().withMessage("Debes completar el campo Descripcion").bail()
    .isLength({min: 20, max: undefined}).withMessage("La descripcion debe tener al menos 20 caracteres"),
    check('productImage').notEmpty().withMessage("Debes completar el campo Descripcion"),
    check('productImage').custom((value, {req}) => {

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


const editeValidations = [
    check('productName').notEmpty().withMessage("Debes completar el campo Nombre").bail()
    .isLength({min: 5, max: undefined}).withMessage("El nombre debe tener al menos 5 caracteres"),
    check('productDescription').notEmpty().withMessage("Debes completar el campo Descripcion").bail()
    .isLength({min: 20, max: undefined}).withMessage("La descripcion debe tener al menos 20 caracteres"),
    check('productImage').notEmpty().withMessage("Debes completar el campo Descripcion"),
    check('productImage').custom((value, {req}) => {

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

// Listado de productos
router.get('/',productController.list);

//Formalio de creación de productos
router.get('/create/',authMiddleware, productController.createProduct);

//Acción de creación
router.post('/',authMiddleware, createValidations, productController.saveNewProduct);

//Detalle de un producto particular
router.get('/:id',productController.productDetail);

//Formulario de edición de productos
router.get('/:id/edit',authMiddleware, productController.edit);

//Acción de edición (a donde se envía el formulario)
router.put('/:id',authMiddleware, editeValidations, productController.saveEdition);

//Acción de borrado
router.delete('/:id',authMiddleware, productController.delete);


module.exports = router





