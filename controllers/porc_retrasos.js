'use strict'
//modulos
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

//modelo
const Retraso = require('../models/porc_retrasos');

//acciones

function addRetraso(req, res) {
    var retraso = new Retraso();
    var params = req.body;

    retraso.porcentaje = params.porcentaje;

    //guardar en la BD
    retraso.save((err, retrasoStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar` });
        } else {
            if (!retrasoStored) {
                res.status(404).send({ message: `No se pudo guardar` });
            } else {
                res.status(200).send({ retraso: retrasoStored });
            }
        }
    });
}

function updateRetraso(req, res) {
    var retrasoID = req.params.id;
    var update = req.body;

    Retraso.findByIdAndUpdate(retrasoID, update, { new: true }, (err, retrasoUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!retrasoUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ retraso: retrasoUpdated });
            }
        }
    });
}

function getRetraso(req, res) {
    Retraso.find({}).exec((err, allRetraso) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allRetraso) {
                res.status(200).send({ message: `No hay daños` });
            } else {
                res.status(200).send({ retraso: allRetraso });
            }
        }
    });
}

module.exports = {
    addRetraso,
    updateRetraso,
    getRetraso
}