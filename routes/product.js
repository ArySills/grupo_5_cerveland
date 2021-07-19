const express = require ("express");
const router = express.Router();
const productController = require ('../controllers/productController');


// Listado de productos
router.get('/',productController.listado);

//Formalio de creación de productos
router.get('/create/',productController.agregar);

//Acción de creación
router.post('/',productController.guardar);

//Detalle de un producto particular
router.get('/:id',productController.detalle);

//Formulario de edición de productos
router.get('/:id/edit',productController.editar);

//Acción de edición (a donde se envía el formulario)
router.put('/:id',productController.guardarEdicion);

//Acción de borrado
router.delete('/:id',productController.borrar);


module.exports = router





