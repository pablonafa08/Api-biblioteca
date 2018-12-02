'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var librosSchema = schema({
    descripcion: String,
    autor: String,
    editorial: String,
    edicion: String,
    fecha_pub: Date,
    existencia: Number,
    disponibles: Number,
    categoria: { type: schema.ObjectId, ref: 'Categoria' }, //categoria
    imagen: String,
    precio: Number, //cambiar tipo
    estatus: String,
    dias_prestamos: Number
});

module.exports = mongoose.model('Libro', librosSchema);