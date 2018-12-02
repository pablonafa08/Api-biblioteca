'use strict'
const express = require('express');
const bodyParser = require('body-parser'); //convierte todo lo que llegue en el body de peticiones a json
const morgan = require('morgan');
const filesUpload = require('express-fileupload');

var app = express();

//importacion de rutas
const bibliotecarioRoutes = require('./routes/bibliotecarios');
const categoriaRoutes = require('./routes/categorias');
const corteRoutes = require('./routes/corte_caja');
const credencialRoutes = require('./routes/credenciales');
const libroDanRoutes = require('./routes/lib_dañados');
const libroPreRoutes = require('./routes/lib_prestados');
const libroRoutes = require('./routes/libros');
const danioRoutes = require('./routes/porc_daños');
const retrasoRoutes = require('./routes/porc_retrasos');
const publicoRoutes = require('./routes/pub_gral');
const puestoRoutes = require('./routes/puestos');
const usuarioRoutes = require('./routes/users');
const precioRoutes = require('./routes/preciocredencial');

//middleware de librerias
app.use(filesUpload());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).send({ message: `Hola mundo` });
});

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Anthoriztion, X-API-KEY, Origin, X-Requested-Whith, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//ruteo
app.use('/bibliotecarios', bibliotecarioRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/cortes', corteRoutes);
app.use('/credenciales', credencialRoutes);
app.use('/librosdan', libroDanRoutes);
app.use('/librospre', libroPreRoutes);
app.use('/libros', libroRoutes);
app.use('/danios', danioRoutes);
app.use('/retrasos', retrasoRoutes);
app.use('/publico', publicoRoutes);
app.use('/puestos', puestoRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/preciocredencial', precioRoutes);

module.exports = app;