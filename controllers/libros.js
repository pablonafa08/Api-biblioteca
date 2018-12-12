'use strict'
//modulos
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const path = require('path');


//modelo
const Libro = require('../models/libros');
const Categoria = require('../models/categorias');

//acciones

function addLibro(req, res) {
    var libro = new Libro();
    var params = req.body;
    // Categoria.findOne({ descripcion: params.categoria }, (err, categoria) => {
    //     if (err) {
    //         res.status(500).send({ message: `Error en la peticion` });
    //     } else {
    //         if (!categoria) {
    //             res.status(200).send({ message: `No hay categoria` });
    //         } else {
    //             libro.categoria = categoria._id;
    //         }
    //     }
    // });
    libro.descripcion = params.descripcion;
    libro.autor = params.autor;
    libro.editorial = params.editorial;
    libro.edicion = params.edicion;
    libro.fecha_pub = params.fecha_pub;
    libro.existencia = params.existencia;
    libro.disponibles = params.disponibles;
    libro.categoria = params.categoria;
    //imagen
    libro.precio = params.precio;
    libro.estatus = params.estatus;
    // libro.dias_prestamos = params.dias_prestamos;

    Libro.findOne({ descripcion: libro.descripcion }, (err, issetLibro) => {
        if (err) {
            res.status(500).send({ message: `Error al hacer la comprobacion` });
        } else {
            if (!issetLibro) {
                //guardar en la BD
                libro.save((err, libroStored) => {
                    if (err) {
                        res.status(500).send({ message: `Error al guardar` });
                    } else {
                        if (!libroStored) {
                            res.status(404).send({ message: `No se pudo guardar` });
                        } else {
                            res.status(200).send({ libro: libroStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: `El libro ya existe` });
            }
        }
    });
}

function updateLibro(req, res) {
    var libroId = req.params.id;
    var update = req.body;

    Libro.findByIdAndUpdate(libroId, update, { new: true }, (err, libroUpdated) => {
        if (err) {
            res.status(500).send({ mesagge: `Error al actualizar` });
        } else {
            if (!libroUpdated) {
                res.status(404).send({ mesagge: `No se pudo actualizar` });
            } else {
                res.status(200).send({ libro: libroUpdated });
            }
        }
    });
}

function uploadImage(req, res) {
    var libroId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.imagen.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            Libro.findByIdAndUpdate(libroId, { imagen: file_name }, { new: true }, (err, libroUpdated) => {
                if (err) {
                    res.status(500).send({ mesagge: `Error al actualizar` });
                } else {
                    if (!libroUpdated) {
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
    var path_file = './uploads/libros/' + imagenFile;

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

            var path = `./uploads/libros/${nombreArchivo}`;

            archivo.mv(path, err => {
                if (err) {
                    res.status(500).send({ message: 'Error al mover el archivo' });
                } else {
                    // res.status(200).send({ message: 'Archivo movido' });
                    // subirArchivo(id, path, res);
                    Libro.findById(id, (err, libroFinded) => {
                        var pathViejo = './uploads/libros/' + libroFinded.imagen;
                        // res.status(200).send({ libro: pathViejo });
                        if (fs.existsSync(pathViejo)) {
                            fs.unlink(pathViejo, err => {
                                if (err) {
                                    res.status(500).send({ message: 'Error al eliminar imagen vieja' });
                                }
                            });
                        }

                        libroFinded.imagen = nombreArchivo;

                        libroFinded.save((err, libroUpdated) => {
                            if (err) {
                                res.status(500).send({ message: 'Error al actualizar' });
                            } else {
                                if (!libroUpdated) {
                                    res.status(404).send({ message: 'No se pudo actualizar' });
                                } else {
                                    res.status(200).send({ libro: libroUpdated });
                                }
                            }
                        });
                    });
                }
            });

        }
    }
}

// function getImagenFile(req, res) {

//     var imagen = req.params.imagen;



// }



function getLibros(req, res) {
    Libro.find({ estatus: 'A' }).populate({ path: 'categoria' }).exec((err, allLibros) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!allLibros) {
                res.status(200).send({ message: `No hay libros` });
            } else {
                res.status(200).send({ libros: allLibros });
            }
        }
    });
}

function getLibro(req, res) {
    var LibroId = req.params.id;

    Libro.findById(LibroId).populate({ path: 'categoria' }).exec((err, libro) => {
        if (err) {
            res.status(500).send({ message: `Error en la peticion` });
        } else {
            if (!libro) {
                res.status(200).send({ message: `No hay libro` });
            } else {
                res.status(200).send({ libro });
            }
        }
    });
}

module.exports = {
    addLibro,
    updateLibro,
    uploadImage,
    getImagen,
    getLibros,
    getLibro,
    fileUpload
    // getImagenFile
}