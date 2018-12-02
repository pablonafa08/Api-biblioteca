'use strict'
//modulos
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const path = require('path');
//modelo
const Usuario = require('../models/users');

//acciones

function addUsuario(req, res) {
    var usuario = new Usuario();
    var params = req.body;

    usuario.nombres = params.nombres;
    usuario.app = params.app;
    usuario.apm = params.apm;
    usuario.calle = params.calle;
    usuario.numero = params.numero;
    usuario.colonia = params.colonia;
    usuario.cp = params.cp;
    usuario.telefono = params.telefono;
    usuario.correo = params.correo;
    usuario.credencial = params.credencial;
    usuario.curp = params.curp;
    usuario.estatus = params.estatus;
    //foto credencial
    usuario.estudiante = params.estudiante;
    usuario.escuela = params.escuela;
    usuario.grado = params.grado;

    Usuario.findOne({ curp: usuario.curp.toLowerCase() }, (err, issetUsuario) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la comprobacion de existencia` });
        } else {
            if (!issetUsuario) {
                usuario.save((err, usuarioStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar el usuario` });
                    } else {
                        if (!usuarioStored) {
                            res.status(404).send({ message: `No se pudo guardar el usuario` });
                        } else {
                            res.status(200).send({ usuario: usuarioStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: `El usuario ya existe` });
            }
        }
    });
}

function updateUsuario(req, res) {
    var usuarioId = req.params.id;
    var update = req.body;

    Usuario.findByIdAndUpdate(usuarioId, update, { new: true }, (err, usuarioUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!usuarioUpdated) {
                res.status(404).send({ message: `No se pudo actualizar` });
            } else {
                res.status(200).send({ usuario: usuarioUpdated });
            }
        }
    });
}

function getUsuarios(req, res) {
    Usuario.find({ estatus: 'A' }).exec((err, allUsuarios) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allUsuarios) {
                res.status(200).send({ message: `No hay usuarios` });
            } else {
                res.status(200).send({ usuarios: allUsuarios });
            }
        }
    });
}

function getUsuario(req, res) {
    var UsuarioId = req.params.id;

    Usuario.findById(UsuarioId).exec((err, usuario) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!usuario) {
                res.status(200).send({ message: `No hay usuario` });
            } else {
                res.status(200).send({ usuario });
            }
        }
    });
}

function uploadImage(req, res) {
    var usuarioId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.imagen.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            Usuario.findByIdAndUpdate(usuarioId, { imagen: file_name }, { new: true }, (err, usuarioUpdated) => {
                if (err) {
                    res.status(500).send({ mesagge: `Error al actualizar` });
                } else {
                    if (!usuarioUpdated) {
                        res.status(404).send({ mesagge: `No se ha podido actualizar` });
                    } else {
                        res.status(200).send({ imagen: file_name });
                    }
                }
            });
        } else {
            fs.unlink(file_path, (err) => {
                if (err) {
                    res.status(200).send({ message: 'Extension no valida y fichero no borrado' });
                } else {
                    res.status(200).send({ message: 'Extension no valida' });
                }
            });


        }


    } else {
        res.status(200).send({ message: 'No se subieron archivos' });
    }
}

function getImagen(req, res) {
    var imagenFile = req.params.imagenfile;
    var path_file = './uploads/usuarios/' + imagenFile;

    fs.exists(path_file, function(exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(404).send({ mesagge: `La imagen no existe` });
        }
    });
}

function fileUpload(req, res) {
    var id = req.params.id;

    if (!req.files) {
        res.status(200).send({ message: 'No se subieron archivos' });
    } else {
        var archivo = req.files.imagen;
        var nombreCortado = archivo.name.split('.');
        var extensionArchivo = nombreCortado[nombreCortado.length - 1];
        // res.status(200).send({ extensionArchivo });
        var extensionesValida = ['png', 'jpg', 'gif', 'jpeg'];
        if (extensionesValida.indexOf(extensionArchivo) < 0) {
            res.status(404).send({ message: 'La extension no es valida' });

        } else {
            var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

            var path = `./uploads/usuarios/${nombreArchivo}`;

            archivo.mv(path, err => {
                if (err) {
                    res.status(500).send({ message: 'Error al mover el archivo' });
                } else {
                    // res.status(200).send({ message: 'Archivo movido' });
                    // subirArchivo(id, path, res);
                    Usuario.findById(id, (err, usuarioFinded) => {
                        var pathViejo = './uploads/usuarios/' + usuarioFinded.imagen;
                        // res.status(200).send({ libro: pathViejo });
                        if (fs.existsSync(pathViejo)) {
                            fs.unlink(pathViejo, err => {
                                if (err) {
                                    res.status(500).send({ message: 'Error al eliminar imagen vieja' });
                                }
                            });
                        }

                        usuarioFinded.imagen = nombreArchivo;

                        usuarioFinded.save((err, usuarioUpdated) => {
                            if (err) {
                                res.status(500).send({ message: 'Error al actualizar' });
                            } else {
                                if (!usuarioUpdated) {
                                    res.status(404).send({ message: 'No se pudo actualizar' });
                                } else {
                                    res.status(200).send({ usuario: usuarioUpdated });
                                }
                            }
                        });
                    });
                }
            });

        }
    }
}
module.exports = {
    addUsuario,
    updateUsuario,
    getUsuarios,
    getUsuario,
    uploadImage,
    getImagen,
    fileUpload
}