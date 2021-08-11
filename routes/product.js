const express = require ("express");
const router = express.Router();
const productController = require ('../controllers/productController');
const authMiddleware = require ('../middlewares/authMiddleware');


// Listado de productos
router.get('/',productController.listado);

//Formalio de creación de productos
router.get('/create/',authMiddleware, productController.agregar);

//Acción de creación
router.post('/',authMiddleware, productController.guardar);

//Detalle de un producto particular
router.get('/:id',productController.detalle);

//Formulario de edición de productos
router.get('/:id/edit',authMiddleware, productController.editar);

//Acción de edición (a donde se envía el formulario)
router.put('/:id',authMiddleware, productController.guardarEdicion);

//Acción de borrado
router.delete('/:id',authMiddleware, productController.borrar);


module.exports = router





