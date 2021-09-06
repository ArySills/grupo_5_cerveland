
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let db = require('../database/models')


const controlador = {
	productDetail: (req, res) => {

		db.Products.findByPk(req.params.id, {
			include: [{association: "productscategories"}]
		})
			.then(product => {
				res.render('products/productDetail', {product: product})
			})
	},
	createProduct: (req, res) => {
		db.ProductCategories.findAll()
			.then(function(categories) {
				return res.render('products/productCreate', {categories: categories})
			})
			.catch(function (error) {
				console.log(error)
			})
	},
	saveNewProduct: (req, res) => {
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
	edit: (req, res) => {
		let productRequest = db.Products.findByPk(req.params.id);

		let categoriesRequest = db.ProductCategories.findAll();
		
		Promise.all([productRequest, categoriesRequest])
			.then(([product, categories]) => {
				res.render('products/productEdit', {product: product, categories: categories})
			})
	},
	saveEdition: (req, res) => {
		db.Products.update({

			productName: req.body.productName,
			productImage: req.body.productImage,
			productDescription: req.body.productDescription,
			productPrice: req.body.productPrice,
			id_productCategory: req.body.productCategory
		}, {
			where: {
				id: req.params.id
			}
		})
		.then(res.redirect('/product/' + req.params.id))
		.catch(function(error) {
			console.log(error)
		})
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
	list: (req, res) => {
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