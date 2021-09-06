const express = require ("express");
const router = express.Router();
const productController = require ('../controllers/productController');
const authMiddleware = require ('../middlewares/authMiddleware');


// Listado de productos
router.get('/',productController.list);

//Formalio de creación de productos
router.get('/create/',authMiddleware, productController.createProduct);

//Acción de creación
router.post('/',authMiddleware, productController.saveNewProduct);

//Detalle de un producto particular
router.get('/:id',productController.productDetail);

//Formulario de edición de productos
router.get('/:id/edit',authMiddleware, productController.edit);

//Acción de edición (a donde se envía el formulario)
router.put('/:id',authMiddleware, productController.saveEdition);

//Acción de borrado
router.delete('/:id',authMiddleware, productController.borrar);


module.exports = router





