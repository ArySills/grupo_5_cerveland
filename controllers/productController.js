const controlador = {
    detalle: (req, res)=>{res.render('products/productDetail')},
    agregar: (req, res) => { res.render('products/productCreate')}
};
module.exports = controlador;