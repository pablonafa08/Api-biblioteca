'use strict'
//modulos
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

//modelo
const Credencial = require('../models/credenciales');

//acciones
function addCredencial(req, res) {
    var credencial = new Credencial();
    var params = req.body;
    var fecha = new Date();
    var dd = fecha.getDate();
    var mm = fecha.getMonth() + 1;
    var yyyy = fecha.getFullYear() + 2;
    var fecha_v = yyyy + '-' + mm + '-' + dd;
    var fecha_today2 = moment().format('YYYY-MM-DD HH:mm:ss');
    var fecha_today = moment().format('YYYY-MM-DD');

    credencial.fecha_vence = fecha_v; //params.fecha_vence;
    credencial.fecha_hoy = fecha_today; //new Date(); //
    credencial.fecha_hoy2 = fecha_today2; //new Date(); //
    //id de la persona
    credencial.costo = params.costo;
    credencial.descuento = params.descuento;
    credencial.total = params.total;
    credencial.estatus = params.estatus;
    credencial.bibliotecario = params.bibliotecario;

    //guardar en la BD
    credencial.save((err, credencialStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar` });
        } else {
            if (!credencialStored) {
                res.status(404).send({ message: `No se pudo guardar` });
            } else {
                res.status(200).send({ credencial: credencialStored });
            }
        }
    });
}

function updateCredencial(req, res) {
    var credencialId = req.params.id;
    var update = req.body;

    Credencial.findByIdAndUpdate(credencialId, update, { new: true }, (err, credencialUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!credencialUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ credencial: credencialUpdated });
            }
        }
    });
}

function getCredencialesDay(req, res) {
    var bibliotecarioId = req.params.id;
    var fecha = new Date();
    var dd = fecha.getDate();
    var mm = fecha.getMonth() + 1;
    var yyyy = fecha.getFullYear();
    var fecha_h = yyyy + '-' + mm + '-' + dd;
    var fecha_today = moment().format('YYYY-MM-DD');
    // moment('2010-10-20').isSameOrBefore('2010-10-21');
    Credencial.find({ fecha_hoy: fecha_today, bibliotecario: bibliotecarioId }).exec((err, allCredenciales) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allCredenciales) {
                res.status(200).send({ message: `No hay credenciales` });
            } else {
                res.status(200).send({ credenciales: allCredenciales });
            }
        }
    });
}

module.exports = {
    addCredencial,
    updateCredencial,
    getCredencialesDay
}