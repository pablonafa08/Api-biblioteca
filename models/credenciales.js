'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var credencialSchema = schema({
    fecha_vence: Date, //checar tipo de dato
    fecha_hoy: Date,
    fecha_hoy2: Date,
    //usuario: { type: schema.ObjectId, ref: 'Usuario' }, //persona_id
    costo: Number, //checar tipo de dato
    descuento: Number, //checar tipo de dato
    total: Number, //checar tipo de dato
    estatus: String
});

module.exports = mongoose.model('Credencial', credencialSchema);