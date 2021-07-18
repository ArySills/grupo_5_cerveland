
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controlador = {
    detalle: (req, res)=>{

    const id = req.params.id;
    const product = products.find((prod) => prod.id == id);

    const viewData = {
        product
    }

    return res.render('products/productDetail', viewData)
	},
    agregar: (req, res) => { 
        return res.render('products/productCreate')
    },
    guardar: (req, res) => { 

        const lastProduct = products[products.length -1]; //Buscamos el último producto
        const productToCreate = req.body; //Guardamos el producto con todos sus atributos q se cargaron en el form, en una variable
        
        productToCreate.id = lastProduct.id + 1; // Agregamos un id consecutivo ascendente al nuevo producto

        products.push(productToCreate); //Agregamos el nuevoproducto al array de productos

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2)); 

        res.redirect(303,'product')
    },
    editar:  (req, res) => {

        const id = req.params.id;
		const product = products.find((prod) => prod.id == id);
		if(!product) {
			return res.send('ERROR NO HAY PRODUCTO')
		}
		const viewData = {
			product
		}
		return res.render('products/productEdit', viewData)
        },






    guardarEdicion: (req, res) => { 

        res.render('products/:id')
    },
    borrar: (req, res) => { 
        res.render('products/:id')
    },
    listado: (req, res) => { 
        return res.render('products/productList')
    }
};

module.exports = controlador;