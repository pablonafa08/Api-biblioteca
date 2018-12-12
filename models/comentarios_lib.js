'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var comentariosSchema = schema({
    usuario: String,
    comentario: String,
    libro: { type: schema.ObjectId, ref: 'Libro' },
    estatus: String,
    fecha: Date
});

module.exports = mongoose.model('Comentario', comentariosSchema);