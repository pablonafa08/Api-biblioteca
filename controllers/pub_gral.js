'use strict'
//modulos
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

//modelo
const Pub_gral = require('../models/pub_gral');

//acciones

function addPublico(req, res) {
    var publico = new Pub_gral();
    var params = req.body;

    publico.nombre = params.nombre;
    publico.edad = params.edad;
    publico.sexo = params.sexo;
    publico.estudiante = params.estudiante;
    publico.entrada = params.entrada;
    publico.salida = params.salida;
    publico.fecha = params.fecha;

    publico.save((err, publicoStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar` });
        } else {
            if (!publicoStored) {
                res.status(404).send({ message: `No se pudo guardar` });
            } else {
                res.status(200).send({ publico: publicoStored });
            }
        }
    });
}

function updatePublico(req, res) {
    var publicoId = req.params.id;
    var update = req.body;

    Pub_gral.findByIdAndUpdate(publicoId, update, { new: true }, (err, publicoUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!publicoUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ message: `Se ha actualizado exitosamente` });
            }
        }
    });
}

function getVisitas(req, res) {
    Pub_gral.find({}).exec((err, allVisitas) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allVisitas) {
                res.status(200).send({ message: `No hay visitas` });
            } else {
                res.status(200).send({ visitas: allVisitas });
            }
        }
    });
}

module.exports = {
    addPublico,
    updatePublico,
    getVisitas
}