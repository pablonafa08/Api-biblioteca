'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var usuariosSchema = schema({
    nombres: String,
    app: String,
    apm: String,
    calle: String,
    numero: String,
    colonia: String,
    cp: String,
    telefono: String,
    correo: String,
    credencial: { type: schema.ObjectId, ref: 'Credencial' }, //id_credencial
    curp: String,
    estatus: String,
    imagen: String, //checar tipo de dato
    estudiante: String, //checar tipo de dato (false, true)
    escuela: { type: schema.ObjectId, ref: 'Escuela' },
    grado: String
});

module.exports = mongoose.model('Usuario', usuariosSchema);