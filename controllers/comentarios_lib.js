'use strict'
//modulos
const moment = require('moment');
//modelo
const Comentario = require('../models/comentarios_lib');

//acciones

function addComentario(req, res) {
    var comentario = new Comentario();
    var params = req.body;
    var hoy = moment().format('YYYY-MM-DD');
    //validacion de parametros requeridos
    comentario.usuario = params.usuario;
    comentario.comentario = params.comentario;
    comentario.libro = params.libro;
    comentario.estatus = params.estatus;
    comentario.fecha = hoy;

    comentario.save((err, comentarioStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar el comentario` })
        } else {
            if (!comentarioStored) {
                res.status(404).send({ message: `No se pudo guardar el comentario` });
            } else {
                res.status(200).send({ comentario: comentarioStored });
            }
        }
    });

}

function updateComentario(req, res) {
    var comentarioId = req.params.id;
    var update = req.body;

    Comentario.findByIdAndUpdate(comentarioId, update, { new: true }, (err, comentarioUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!comentarioUpdated) {
                res.status(404).send({ message: `No se ha podido actualizar` });
            } else {
                res.status(200).send({ comentario: comentarioUpdated });
            }
        }
    });
}


function getComentariosXLibro(req, res) {
    var libroId = req.params.id;
    Comentario.find({ estatus: 'A', libro: libroId }).exec((err, allComentarios) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allComentarios) {
                res.status(200).send({ message: `No hay comentarios` });
            } else {
                res.status(200).send({ comentarios: allComentarios });
            }
        }
    });
}

function getComentarios(req, res) {
    Comentario.find({ estatus: 'A' }).exec((err, allComentarios) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allComentarios) {
                res.status(200).send({ message: `No hay comentarios` });
            } else {
                res.status(200).send({ comentarios: allComentarios });
            }
        }
    });
}


module.exports = {
    addComentario,
    updateComentario,
    getComentarios,
    getComentariosXLibro
}