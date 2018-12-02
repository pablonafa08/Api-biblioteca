'use strict'
//modulos
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

//modelo
const Danio = require('../models/porc_daños');

//acciones

function addDanio(req, res) {
    var danio = new Danio();
    var params = req.body;

    danio.descripcion = params.descripcion;
    danio.porcentaje = params.porcentaje;
    danio.estatus = params.estatus;

    Danio.findOne({ descripcion: danio.descripcion.toLowerCase() }, (err, issetDanio) => {
        if (err) {
            res.status(500).send({ message: `Error al buscar` });
        } else {
            if (!issetDanio) {
                //guardar en la BD
                danio.save((err, danioStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar` });
                    } else {
                        if (!danioStored) {
                            res.status(404).send({ message: `No se pudo guardar` });
                        } else {
                            //res.status(200).send({ message: `Se ha guardado exitosamente` });
                            res.status(200).send({ danio: danioStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: `El daño ya existe` });
            }
        }
    });
}

function updateDanio(req, res) {
    var danioId = req.params.id;
    var update = req.body;

    Danio.findByIdAndUpdate(danioId, update, { new: true }, (err, danioUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!danioUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ danio: danioUpdated });
            }
        }
    });
}

function getDanios(req, res) {
    Danio.find({ estatus: 'A' }).exec((err, allDanios) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allDanios) {
                res.status(200).send({ message: `No hay daños` });
            } else {
                res.status(200).send({ danios: allDanios });
            }
        }
    });
}

function getDanio(req, res) {
    var danioId = req.params.id;

    Danio.findById(danioId).exec((err, danio) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!danio) {
                res.status(200).send({ message: `No hay danio` });
            } else {
                res.status(200).send({ danio });
            }
        }
    });
}
module.exports = {
    addDanio,
    updateDanio,
    getDanios,
    getDanio
}