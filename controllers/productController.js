
// agregar y listado hechos

const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controlador = {
    agregar: (req, res) => { res.render('products/productCreate')},
    listado: (req, res) => { res.render('products/productList')},
   
    
    detalle: (req, res)=>{const id = req.params.id;
        const product = products.find((prod) => prod.id == id);
    
        const viewData = {
            product
        }
    
        return res.render('productDetail', viewData)
        },
    guardar: (req, res) => { res.redirect(303,'products/productList')},
    editar:  (req, res) => { res.render('products/:id/edit')},
    guardarEdicion: (req, res) => { res.render('products/:id')},
    borrar: (req, res) => { res.render('products/:id')}
};
module.exports = controlador;