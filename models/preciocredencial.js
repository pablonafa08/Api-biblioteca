'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var precioSchema = schema({
    precio: Number,
    porcentaje: Number
});

module.exports = mongoose.model('Precio', precioSchema);