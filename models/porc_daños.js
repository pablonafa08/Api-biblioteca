'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var danioSchema = schema({
    descripcion: String,
    porcentaje: Number, //float
    estatus: String
});

module.exports = mongoose.model('Danio', danioSchema);