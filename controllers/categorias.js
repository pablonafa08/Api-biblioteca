'use strict'
//modulos
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

//modelo
const Categoria = require('../models/categorias');

//acciones

function addCategoria(req, res) {
    var categoria = new Categoria();
    var params = req.body;

    //validacion de parametros requeridos
    categoria.descripcion = params.descripcion;
    categoria.estatus = params.estatus;

    //buscar que ya existe la categoria
    Categoria.findOne({ descripcion: categoria.descripcion.toLowerCase() }, (err, issetCategoria) => {
        if (err) {
            res.status(500).send({ message: `Error al comprobar existencia` });
        } else {
            if (!issetCategoria) {
                //guardar en la BD
                categoria.save((err, categoriaStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar la categoria` })
                    } else {
                        if (!categoriaStored) {
                            res.status(404).send({ message: `No se pudo guardar la categoria` });
                        } else {
                            res.status(200).send({ categoria: categoriaStored });
                        }
                    }
                });

            } else {
                res.status(200).send({ message: `La categoria ya existe` });
            }
        }
    });

}

function updateCategoria(req, res) {
    var categoriaId = req.params.id;
    var update = req.body;

    Categoria.findByIdAndUpdate(categoriaId, update, { new: true }, (err, categoriaUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!categoriaUpdated) {
                res.status(404).send({ message: `No se ha podido actualizar` });
            } else {
                res.status(200).send({ categoria: categoriaUpdated });
            }
        }
    });
}


function getCategorias(req, res) {
    Categoria.find({ estatus: 'A' }).exec((err, allCategorias) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allCategorias) {
                res.status(200).send({ message: `No hay categorias` });
            } else {
                res.status(200).send({ categorias: allCategorias });
            }
        }
    });
}

function getCategoria(req, res) {
    var categoriaId = req.params.id;

    Categoria.findById(categoriaId).exec((err, categoria) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!categoria) {
                res.status(200).send({ message: `No hay categoria` });
            } else {
                res.status(200).send({ categoria });
            }
        }
    });
}

module.exports = {
    addCategoria,
    updateCategoria,
    getCategorias,
    getCategoria
}