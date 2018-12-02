'use strict'
//modulos
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

//modelo
const Precio = require('../models/preciocredencial');

//acciones

function addPrecio(req, res) {
    var precio = new Precio();
    var params = req.body;

    precio.precio = params.precio;
    precio.porcentaje = params.porcentaje;

    //guardar en la BD
    precio.save((err, precioStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar` });
        } else {
            if (!precioStored) {
                res.status(404).send({ message: `No se pudo guardar` });
            } else {
                res.status(200).send({ precio: precioStored });
            }
        }
    });
}

function updatePrecio(req, res) {
    var precioID = req.params.id;
    var update = req.body;

    Precio.findByIdAndUpdate(precioID, update, { new: true }, (err, precioUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!precioUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ precio: precioUpdated });
            }
        }
    });
}

function getPrecio(req, res) {
    Precio.find({}).exec((err, allprecio) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allprecio) {
                res.status(200).send({ message: `No hay precios` });
            } else {
                res.status(200).send({ precio: allprecio });
            }
        }
    });
}


module.exports = {
    addPrecio,
    updatePrecio,
    getPrecio
}