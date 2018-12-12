'use strict'
//modulos
const moment = require('moment');
const bcrytp = require('bcrypt-nodejs');

//modelo
const LibDaniado = require('../models/lib_dañados');

//acciones

function addLibDaniado(req, res) {
    var danio = new LibDaniado();
    var params = req.body;
    var hoy = moment().format('YYYY-MM-DD');
    danio.prestamo = params.prestamo;
    danio.danio = params.danio;
    danio.porcentaje = params.porcentaje;
    danio.cobro_dan = params.cobro_dan;
    danio.comentarios = params.comentarios;
    danio.fecha = hoy;
    danio.bibliotecario = params.bibliotecario;

    danio.save((err, danioLibStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar` });
        } else {
            if (!danioLibStored) {
                res.status(404).send({ message: `No se pudo guardar` });
            } else {
                res.status(200).send({ daniolib: danioLibStored });
            }
        }
    });
}

function getLibDaniadosDay(req, res) {
    var bibliotecarioId = req.params.id;
    var fecha_today = moment().format('YYYY-MM-DD');
    LibDaniado.find({ fecha: fecha_today, bibliotecario: bibliotecarioId }).exec((err, allLibDaniados) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allLibDaniados) {
                res.status(200).send({ message: `No hay prestamos` });
            } else {
                res.status(200).send({ daniados: allLibDaniados });
            }
        }
    });
}

module.exports = {
    addLibDaniado,
    getLibDaniadosDay
}