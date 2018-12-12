'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var escuelaSchema = schema({
    descripcion: String,
    estatus: String
});

module.exports = mongoose.model('Escuela', escuelaSchema);