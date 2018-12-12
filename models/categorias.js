'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var categoriasSchema = schema({
    descripcion: String,
    dias_prestamos: Number,
    estatus: String
});

module.exports = mongoose.model('Categoria', categoriasSchema);