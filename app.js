const express = require ('express');
const app = express();

const path = require('path');
const publicPath = path.resolve(__dirname, 'public');
const rutaProductos = require ('./routes/product');
const rutaCarrito = require ('./routes/cart');
const rutaRegister = require ('./routes/register');
const rutaIndex = require ('./routes/index');


app.use(express.static(publicPath));

app.set("view engine", "ejs");

app.listen (3000, console.log("servidor levantado"));


app.use('/', rutaIndex);

app.use('/product', rutaProductos);

app.use('/cart', rutaCarrito);

app.use('/register', rutaRegister);






