'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var corteSchema = schema({ //checar todos los tipos de datos
    tot_credencial: Number,
    tot_danios: Number,
    tot_retraso: Number,
    total: Number,
    fecha: Date,
    bibliotecario: { type: schema.ObjectId, ref: 'Bibliotecario' }, //bibiliotecario_id
    num_pagos: Number
});

module.exports = mongoose.model('Corte', corteSchema);