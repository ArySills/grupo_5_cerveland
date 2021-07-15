const controlador = {
    detalle: (req, res)=>{res.render('products/productDetail')},
    agregar: (req, res) => { res.render('products/productCreate')},
    listado: (req, res) => { res.render('products/productList')},
    guardar: (req, res) => { res.redirect(303,'products/productList')},
    editar:  (req, res) => { res.render('products/:id/edit')},
    guardarEdicion: (req, res) => { res.render('products/:id')},
    borrar: (req, res) => { res.render('products/:id')}
};
module.exports = controlador;