'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var librosDanSchema = schema({
    prestamo: { type: schema.ObjectId, ref: 'LibPrestado' }, //id_prestamo
    danio: { type: schema.ObjectId, ref: 'Danio' }, //tamaño de daño
    fecha: Date,
    porcentaje: Number,
    cobro_dan: Number,
    comentarios: String,
    bibliotecario: { type: schema.ObjectId, ref: 'Bibliotecario' }
});

module.exports = mongoose.model('LibDaniado', librosDanSchema);