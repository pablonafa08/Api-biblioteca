'use strict'
//modulos
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

//modelo
const Puesto = require('../models/puestos');

//acciones

function addPuesto(req, res) {
    var puesto = new Puesto();
    var params = req.body;

    puesto.descripcion = params.descripcion;
    puesto.estatus = params.estatus;

    Puesto.findOne({ descripcion: puesto.descripcion.toLowerCase() }, (err, issetPuesto) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la comprobacion de existencia` });
        } else {
            if (!issetPuesto) {
                //guardar en la BD
                puesto.save((err, puestoStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar` });
                    } else {
                        if (!puestoStored) {
                            res.status(404).send({ message: `No se pudo guardar` });
                        } else {
                            res.status(200).send({ puesto: puestoStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: `El puesto ya existe` });
            }
        }
    });
}

function updatePuesto(req, res) {
    var puestoId = req.params.id;
    var update = req.body;
    Puesto.findByIdAndUpdate(puestoId, update, { new: true }, (err, puestoUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!puestoUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ puesto: puestoUpdated });
            }
        }
    });
}


function getPuestos(req, res) {
    Puesto.find({ estatus: 'A' }).exec((err, allPuestos) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allPuestos) {
                res.status(200).send({ message: `No hay puestos` });
            } else {
                res.status(200).send({ puestos: allPuestos });
            }
        }
    });
}

function getPuesto(req, res) {
    var puestoId = req.params.id;

    Puesto.findById(puestoId).exec((err, puesto) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!puesto) {
                res.status(200).send({ message: `No hay puesto` });
            } else {
                res.status(200).send({ puesto });
            }
        }
    });
}



module.exports = {
    addPuesto,
    updatePuesto,
    getPuestos,
    getPuesto
}