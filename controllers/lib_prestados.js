'use strict'
//modulos
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

//modelo
const LibPrestado = require('../models/lib_prestados');

//acciones

function addLibPrestado(req, res) {
    var prestamo = new LibPrestado();
    var params = req.body;
    var fecha_today = moment().format('YYYY-MM-DD');

    prestamo.libro = params.libro;
    prestamo.usuario = params.usuario;
    prestamo.bibliotecario = params.bibliotecario;
    prestamo.fecha = fecha_today;
    prestamo.fecha2 = new Date();
    prestamo.fecha_entrega_A = params.fecha_entrega_A; // new Date(); //calcular la fecha
    //fecha real
    prestamo.estatus = params.estatus;
    prestamo.comentarios_prestamo = params.comentarios_prestamo;
    //entrega a tiempo
    //entrega danio
    prestamo.save((err, prestamoStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar` });
        } else {
            if (!prestamoStored) {
                res.status(404).send({ message: `No se pudo guardar` });
            } else {
                res.status(200).send({ prestamo: prestamoStored });
            }
        }
    });

}

function updateLibPrestado(req, res) {
    var libPrestadoId = req.params.id;
    var update = req.body;
    var hoy = moment().format('YYYY-MM-DD');
    update.fecha_entrega_R = hoy;

    LibPrestado.findByIdAndUpdate(libPrestadoId, update, { new: true }, (err, libPrestadoUpdated) => {
        if (err) {
            res.status(500).send({ message: `Error al actualizar` });
        } else {
            if (!libPrestadoUpdated) {
                res.status(404).send({ message: `No se ha podido actualizar` });
            } else {
                res.status(200).send({ prestamo: libPrestadoUpdated });
            }
        }
    });
}


function getLibPrestados(req, res) {
    LibPrestado.find({ estatus: 'A' }).populate({ path: 'libro' }).populate({ path: 'usuario' }).populate({ path: 'bibliotecario' }).exec((err, allPrestamos) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allPrestamos) {
                res.status(200).send({ message: `No hay prestamos` });
            } else {
                res.status(200).send({ prestamos: allPrestamos });
            }
        }
    });
}

function getLibPrestadosTodos(req, res) {
    LibPrestado.find({}).populate({ path: 'libro' }).populate({ path: 'usuario' }).populate({ path: 'bibliotecario' }).exec((err, allPrestamos) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allPrestamos) {
                res.status(200).send({ message: `No hay prestamos` });
            } else {
                res.status(200).send({ prestamos: allPrestamos });
            }
        }
    });
}

function getLibDevueltosDay(req, res) {
    var bibliotecarioId = req.params.id;
    var fecha_today = moment().format('YYYY-MM-DD');
    LibPrestado.find({ estatus: 'B', fecha_entrega_R: fecha_today, bibliotecario_dev: bibliotecarioId }).populate({ path: 'libro' }).populate({ path: 'usuario' }).populate({ path: 'bibliotecario' }).exec((err, allPrestamos) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allPrestamos) {
                res.status(200).send({ message: `No hay prestamos` });
            } else {
                res.status(200).send({ prestamos: allPrestamos });
            }
        }
    });
}

function getLibPrestadosyDev(req, res) {
    LibPrestado.find({ estatus: 'B' }).populate({ path: 'libro' }).populate({ path: 'usuario' }).populate({ path: 'bibliotecario' }).exec((err, allPrestamos) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allPrestamos) {
                res.status(200).send({ message: `No hay prestamos` });
            } else {
                res.status(200).send({ prestamos: allPrestamos });
            }
        }
    });
}

function getLibPrestadosyDevByUsuario(req, res) {
    var usuarioId = req.params.id;
    LibPrestado.find({ estatus: 'B', usuario: usuarioId }).populate({ path: 'libro' }).populate({ path: 'usuario' }).populate({ path: 'bibliotecario' }).exec((err, allPrestamos) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allPrestamos) {
                res.status(200).send({ message: `No hay prestamos` });
            } else {
                res.status(200).send({ prestamos: allPrestamos });
            }
        }
    });
}

function getPrestamo(req, res) {
    var prestamoId = req.params.id;

    LibPrestado.findById(prestamoId).populate({ path: 'libro' }).populate({ path: 'usuario' }).exec((err, prestamo) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!prestamo) {
                res.status(200).send({ message: `No hay prestamo` });
            } else {
                res.status(200).send({ prestamo });
            }
        }
    });
}

function comprobarFecha(req, res) {
    var fecha = req.params.fecha;
    var hoy = moment().format('YYYY-MM-DD');
    var retraso = moment(fecha).isSameOrBefore(hoy);
    res.status(200).send({ retraso });
}

function contarDiasRetraso(req, res) {
    var fecha = req.params.fecha;
    var fecha1 = fecha.split("T");
    // var hoy = moment().format('YYYY-MM-DD');
    // var dias = hoy.diff(fecha, 'days'); //moment(fecha, "YYYYMMDD").fromNow();
    var a = moment(); //.format('YYYY-MM-DD'); //moment([2007, 0, 29]);
    var b = moment(fecha1[0]); //fecha; //moment(fecha).format('YYYY-MM-DD');
    var c = a.diff(b, 'days')
    res.status(200).send({ c });
}

function ordenadoporFechasATiempo(req, res) {
    var hoy = moment().format('YYYY-MM-DD');
    LibPrestado.find({ estatus: 'A', fecha_entrega_A: { $gt: hoy } }).sort({ fecha_entrega_A: 1 }).populate({ path: 'libro' }).populate({ path: 'usuario' }).populate({ path: 'bibliotecario' }).exec((err, docs) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!docs) {
                res.status(200).send({ message: `No hay prestamos` });
            } else {
                res.status(200).send({ prestamos: docs });
            }
        }
    });
    // LibPrestado.find({ estatus: 'A' }, {
    //     "fecha_entrega_A": [
    //         ['datefield', 'asc']
    //     ]
    // }, function(err, docs) {
    //     if (err) {
    //         res.status(500).send({ message: `Error en la peticion` });
    //     } else {
    //         if (!docs) {
    //             res.status(200).send({ message: `No hay prestamos` });
    //         } else {
    //             res.status(200).send({ prestamos: docs });
    //         }
    //     }
    // });
}

function ordenadoporFechasConRetraso(req, res) {
    var hoy = moment().format('YYYY-MM-DD');
    LibPrestado.find({ estatus: 'A', fecha_entrega_A: { $lt: hoy } }).sort({ fecha_entrega_A: 1 }).populate({ path: 'libro' }).populate({ path: 'usuario' }).populate({ path: 'bibliotecario' }).exec((err, docs) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!docs) {
                res.status(200).send({ message: `No hay prestamos` });
            } else {
                res.status(200).send({ prestamos: docs });
            }
        }
    });

}
module.exports = {
    addLibPrestado,
    updateLibPrestado,
    getLibPrestados,
    getPrestamo,
    comprobarFecha,
    contarDiasRetraso,
    getLibDevueltosDay,
    getLibPrestadosyDev,
    getLibPrestadosyDevByUsuario,
    getLibPrestadosTodos,
    ordenadoporFechasATiempo,
    ordenadoporFechasConRetraso
}