const Sequelize = require('sequelize');

let db = require('../../database/models');

const { validationResult } = require('express-validator');

const controlador = {
	productDetail: (req, res) => {

		db.Products.findByPk(req.params.id, {
			include: [{ association: "productscategories" }]
		})
			.then(product => {
				return res.status(200).json({
                    productName: product.productName,
                    productPrice: product.productPrice,
                    id_productCategory: product.id_productCategory,
                    productDescription: product.productDescription,
                    productImage: product.productImage,
                    status: 200
                })
			})
	},
	createProduct: (req, res) => {
		db.ProductCategories.findAll()
			.then(function (categories) {
				return res.render('products/productCreate', { categories: categories })
			})
			.catch(function (error) {
				console.log(error)
			})
	},
	saveNewProduct: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			db.Products.create({

				productName: req.body.productName,
				productImage: req.file.filename,
				productDescription: req.body.productDescription,
				productPrice: req.body.productPrice,
				id_productCategory: req.body.productCategory
			})
				.then(res.redirect('/product'))
				.catch(function (error) {
					console.log(error)
				})

		} else {
			db.ProductCategories.findAll()
				.then(function (categories) {

					return res.render('products/productCreate', {
						categories: categories,
						errors: errors.mapped(),
						oldData: req.body
					})

				})
				.catch(function (error) {
					console.log(error)
				})

		}

	},
	edit: (req, res) => {
		let productRequest = db.Products.findByPk(req.params.id);

		let categoriesRequest = db.ProductCategories.findAll();

		Promise.all([productRequest, categoriesRequest])
			.then(([product, categories]) => {
				res.render('products/productEdit', { product: product, categories: categories })
			})
	},
	saveEdition: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty()) {
			console.log('este es el body' + req.body.productName)
			db.Products.update({

				productName: req.body.productName,
				productImage: req.file.filename,
				productDescription: req.body.productDescription,
				productPrice: req.body.productPrice,
				id_productCategory: req.body.productCategory
			}, {
				where: {
					id: req.params.id
				}
			})
				.then(res.redirect('/product/' + req.params.id))
				.catch(function (error) {
					console.log(error)
				})
		} else {
			let productRequest = db.Products.findByPk(req.params.id);

			let categoriesRequest = db.ProductCategories.findAll();

			Promise.all([productRequest, categoriesRequest])
				.then(([product, categories]) => {
					res.render('products/productEdit', { product: product, categories: categories, errors: errors.mapped(), oldData: req.body })
				})

		}
	},
	delete: (req, res) => {
		db.Products.destroy({
			where: {
				id: req.params.id
			}
		})
			.then(res.redirect('/product'))
	},
	list: (req, res) => {
		db.Products.findAll()
			.then(function (products) {

				return res.status(200).json({
					count: products.length,
					countByCategory: db.Products.findAll({
						attributes: ['id_productCategory',
							Sequelize.fn('count', Sequelize.col('id'))],
						group: ['id_productCategory']
					})
						.then(categories => {
							console.log(categories)
							return categories
						})
						.catch(function (error) {
							console.log(error);
						}),
					products: products,
					status: 200
				})

			})
			.catch(function (error) {
				console.log(error);
			})
	}
};

module.exports = controlador;