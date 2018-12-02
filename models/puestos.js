'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var puestosSchema = schema({
    descripcion: String,
    estatus: String
});

module.exports = mongoose.model('Puesto', puestosSchema);