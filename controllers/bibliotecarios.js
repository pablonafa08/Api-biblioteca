'use strict'
//modulos
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

//modelo
const Bibliotecario = require('../models/bibliotecarios');
const Puesto = require('../models/puestos');

//servicio jwt
const jwt = require('../services/jwt');

//acciones

function addBibliotecario(req, res) {
    var bibliotecario = new Bibliotecario();
    var params = req.body;
    // console.log(params.puesto);
    // Puesto.findOne({ descripcion: params.puesto }, (err, puesto) => {
    //     if (err) {
    //         res.status(500).send({ message: `Error en la peticion` });
    //     } else {
    //         if (!puesto) {
    //             res.status(200).send({ message: `No hay puestos` });
    //         } else {
    //             bibliotecario.puesto = puesto._id;
    //         }
    //     }
    // });
    //validacion de parametros requeridos
    bibliotecario.nombres = params.nombres;
    bibliotecario.app = params.app;
    bibliotecario.apm = params.apm;
    bibliotecario.calle = params.calle;
    bibliotecario.numero = params.numero;
    bibliotecario.colonia = params.colonia;
    bibliotecario.cp = params.cp;
    bibliotecario.telefono = params.telefono;
    bibliotecario.correo = params.correo;
    bibliotecario.puesto = params.puesto;
    bibliotecario.horario = params.horario;
    bibliotecario.estatus = params.estatus;
    bibliotecario.contra = params.contra;


    Bibliotecario.findOne({ correo: bibliotecario.correo.toLowerCase() }, (err, issetBibliotecario) => {
        if (err) {
            res.status(500).send({ message: `Error al comprobar existencia` });
        } else {
            if (!issetBibliotecario) {
                //cifrar contraseña
                bcrypt.hash(params.contra, null, null, (err, hash) => {
                    bibliotecario.contra = hash;
                    //guardar en la BD
                    bibliotecario.save((err, bibliotecarioStored) => {
                        if (err) {
                            res.status(500).send({ message: `Error al guardar el bibliotecario` });
                        } else {
                            if (!bibliotecarioStored) {
                                res.status(404).send({ mesagge: `No se ha podido guardar el bibliotecario` });
                            } else {
                                res.status(200).send({ bibliotecario: bibliotecarioStored });
                            }
                        }
                    });
                });
            } else {
                res.status(200).send({ messgae: `El correo ya existe` });
            }
        }
    });

}

function updateBibliotecario(req, res) {
    var bibliotecarioId = req.params.id;
    var update = req.body;
    // Puesto.findOne({ descripcion: params.puesto }, (err, puesto) => {
    //     if (err) {
    //         res.status(500).send({ message: `Error en la peticion` });
    //     } else {
    //         if (!puesto) {
    //             res.status(200).send({ message: `No hay puestos` });
    //         } else {
    //             bibliotecario.puesto = puesto._id;
    //         }
    //     }
    // });
    Bibliotecario.findByIdAndUpdate(bibliotecarioId, update, { new: true }, (err, bibliotecarioUpdated) => {
        if (err) {
            res.status(500).send({ mesagge: `Error al actualizar` });
        } else {
            if (!bibliotecarioUpdated) {
                res.status(404).send({ mesagge: `No se ha podido actualizar` });
            } else {
                res.status(200).send({ bibliotecario: bibliotecarioUpdated });
            }
        }
    });
}

function getBibliotecarios(req, res) {
    Bibliotecario.find({ estatus: 'A' }).exec((err, allBibliotecarios) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allBibliotecarios) {
                res.status(200).send({ message: `No hay bibliotecarios` });
            } else {
                res.status(200).send({ bibliotecarios: allBibliotecarios });
            }
        }
    });
}

function getBibliotecario(req, res) {
    var bibliotecarioId = req.params.id;

    Bibliotecario.findById(bibliotecarioId).populate({ path: 'puesto' }).exec((err, bibliotecario) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!bibliotecario) {
                res.status(200).send({ message: `No hay bibliotecario` });
            } else {
                res.status(200).send({ bibliotecario });
            }
        }
    });
}

function login(req, res) {
    var params = req.body;
    var correo = params.correo;
    var contra = params.contra;

    Bibliotecario.findOne({ correo: correo.toLowerCase() }, (err, bibliotecario) => {
        if (err) {
            res.status(500).send({ message: 'Error al comprobar el usuario' });
        } else {
            if (bibliotecario) {
                bcrypt.compare(contra, bibliotecario.contra, (err, check) => {
                    if (check) {
                        //comprobar y generar token
                        if (params.gettoken) {
                            res.status(200).send({
                                token: jwt.createToken(bibliotecario)
                            });
                        } else {
                            res.status(200).send({ bibliotecario });
                        }
                    } else {
                        res.status(404).send({
                            message: 'La contraseña ingresada no es correcta'
                        });
                    }
                });
                //res.status(200).send({user});
            } else {
                res.status(404).send({ message: 'Usuario no registrado' });
            }
        }
    });

}

module.exports = {
    addBibliotecario,
    updateBibliotecario,
    getBibliotecarios,
    getBibliotecario,
    login
}