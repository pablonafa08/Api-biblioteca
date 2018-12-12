'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var publicoSchema = schema({
    nombre: String,
    edad: Number,
    sexo: String,
    estudiante: String, //checar si no es true o false
    escuela: { type: schema.ObjectId, ref: 'Escuela' },
    entrada: String, //checar tipo dato
    salida: String, //checar tipo dato
    fecha: String //checar tipo dato
});

module.exports = mongoose.model('Visita', publicoSchema);