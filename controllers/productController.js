
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let db = require('../database/models')


const controlador = {
	detalle: (req, res) => {
		db.Products.findByPk(req.params.id, {
			include: [{association: "productscategories"}]
		})
			.then(product => {
				console.log(product)
				res.render('products/productDetail', {product: product})
			})
	/*
		const id = req.params.id;
		const product = products.find((prod) => prod.id == id);

		const viewData = {
			product
		}

		return res.render('products/productDetail', viewData)
		*/
	},
	agregar: (req, res) => {
		db.ProductCategories.findAll()
			.then(function(categories) {
				return res.render('products/productCreate', {categories: categories})
			})
			.catch(function (error) {
				console.log(error)
			})
	},
	guardar: (req, res) => {
		db.Products.create({
			productName: req.body.productName,
			productImage: req.body.productImage,
			productDescription: req.body.productDescription,
			productPrice: req.body.productPrice,
			id_productCategory: req.body.productCategory
		})
		.then(res.redirect('/product'))
		.catch(function(error) {
			console.log(error)
		})
	},
	editar: (req, res) => {

		const id = req.params.id;
		const product = products.find((prod) => prod.id == id);
		if (!product) {
			return res.send('El producto no existe')
		}
		const viewData = {
			product
		}
		return res.render('products/productEdit', viewData)
	},
	guardarEdicion: (req, res) => {


		// ENCONTRAR EL INDICE DEL PRODUCTO EN EL ARRAY
		// EN BASE A SU ID
		const indiceDelProducto = products.findIndex(producto => producto.id == req.params.id);

		// products[indice encontrado] == producto en el array
		products[indiceDelProducto] = { ...products[indiceDelProducto], ...req.body };

		// GUARDAR LA NUEVA BASE DE DATOS
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		//        PUSIMOS REDIRECCIONAR AL HOME, POR QUE CON 'PRODUCT' NOS TIRABA ERROR

		res.redirect(303, '../product');


	},
	borrar: (req, res) => {

		// Buscar el producto con el id recibido por parametros en el array
		// Eliminarlo
		// Guardar el archivo .json con el nuevo contenido de products

		// Filter


		const nuevoArray = products.filter((product) => product.id != req.params.id);
		// Todos los productos cuyo id sea diferente al enviado por parámetro


		fs.writeFileSync(productsFilePath, JSON.stringify(nuevoArray, null, 2));


		// session.mensaje = 'Producto creado';

		// vista
		// if(session.mensaje) 
		// <p> <%= session.mensaje %> 
		res.redirect(303, '../product') // Notice the 303 parameter



	},
	listado: (req, res) => {
		db.Products.findAll()
			.then(function (products) {
				res.render('products/productList',{products: products})
			})
			.catch( function(errror) {
				console.log(error);
			})
	}
};

module.exports = controlador;