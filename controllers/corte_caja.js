'use strict'
//modulos
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

//modelo
const Corte = require('../models/corte_caja');

//acciones

function addCorte(req, res) {
    var corte = new Corte();
    var params = req.body;

    corte.tot_credencial = params.tot_credencial;
    corte.tot_danios = params.tot_danios;
    corte.tot_retraso = params.tot_retraso;
    corte.total = params.total;
    corte.fecha = moment().format('YYYY-MM-DD');
    corte.bibliotecario = params.bibliotecario;
    corte.num_pagos = params.num_pagos;

    corte.save((err, corteStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar` });
        } else {
            if (!corteStored) {
                res.status(404).send({ message: `No se pudo guardar` });
            } else {
                res.status(200).send({ corte: corteStored });
            }
        }
    });
}

function allCortes(req, res) {
    Corte.find({}).populate({ path: 'bibliotecario' }).exec((err, allCortes) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allCortes) {
                res.status(200).send({ message: `No hay cortes` });
            } else {
                res.status(200).send({ cortes: allCortes });
            }
        }
    });
}

function comprobarCorte(req, res) {
    var bibliotecarioId = req.params.id;
    var hoy = moment().format('YYYY-MM-DD');
    Corte.find({ bibliotecario: bibliotecarioId, fecha: hoy }).exec((err, allCortes) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allCortes) {
                res.status(200).send({ message: `No hay cortes` });
            } else {
                res.status(200).send({ cortes: allCortes });
            }
        }
    });
}

module.exports = {
    addCorte,
    allCortes,
    comprobarCorte
}