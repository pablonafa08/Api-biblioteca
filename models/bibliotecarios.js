'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var bibliotecariosSchema = schema({
    nombres: String,
    app: String,
    apm: String,
    calle: String,
    numero: String,
    colonia: String,
    cp: String,
    telefono: String,
    correo: String,
    puesto: { type: schema.ObjectId, ref: 'Puesto' }, //puesto
    horario: String,
    estatus: String,
    contra: String
});

module.exports = mongoose.model('Bibliotecario', bibliotecariosSchema);