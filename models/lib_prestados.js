'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var libPrestadosSchema = schema({ //checar si se agrega el precio del libro Y checar tipos de datos
    libro: { type: schema.ObjectId, ref: 'Libro' }, //id_libro
    usuario: { type: schema.ObjectId, ref: 'Usuario' }, //id_persona
    bibliotecario: { type: schema.ObjectId, ref: 'Bibliotecario' }, //id_bibliotecario
    fecha: Date,
    fecha2: Date,
    fecha_entrega_A: Date,
    fecha_entrega_R: Date,
    estatus: String,
    comentarios_prestamo: String,
    entrega_tiempo: String, //status (true, false)
    entrega_danio: String, //↑
    dias_retraso: Number,
    porcentaje: Number,
    cobro_retraso: Number
});

module.exports = mongoose.model('LibPrestado', libPrestadosSchema);