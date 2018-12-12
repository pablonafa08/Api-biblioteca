'use strict'
//modulos

//modelo
const Escuela = require('../models/escuelas');

//acciones

function addEscuela(req, res) {
    var escuela = new Escuela();
    var params = req.body;

    escuela.descripcion = params.descripcion;
    escuela.estatus = params.estatus;

    Escuela.findOne({ descripcion: escuela.descripcion }, (err, issetEscuela) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la comprobacion de existencia` });
        } else {
            if (!issetEscuela) {
                //guardar en la BD
                escuela.save((err, escuelaStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar` });
                    } else {
                        if (!escuelaStored) {
                            res.status(404).send({ message: `No se pudo guardar` });
                        } else {
                            res.status(200).send({ escuela: escuelaStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: `La escuela ya existe` });
            }
        }
    });
}

function updateEscuela(req, res) {
    var escuelaId = req.params.id;
    var update = req.body;
    Escuela.findByIdAndUpdate(escuelaId, update, { new: true }, (err, escuelaUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!escuelaUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ escuela: escuelaUpdated });
            }
        }
    });
}


function getEscuelas(req, res) {
    Escuela.find({ estatus: 'A' }).exec((err, allEscuelas) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allEscuelas) {
                res.status(200).send({ message: `No hay escuelas` });
            } else {
                res.status(200).send({ escuelas: allEscuelas });
            }
        }
    });
}

function getEscuela(req, res) {
    var escuelaId = req.params.id;

    Escuela.findById(escuelaId).exec((err, escuela) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!escuela) {
                res.status(200).send({ message: `No hay escuela` });
            } else {
                res.status(200).send({ escuela });
            }
        }
    });
}



module.exports = {
    addEscuela,
    updateEscuela,
    getEscuelas,
    getEscuela
}