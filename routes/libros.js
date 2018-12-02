'use strict'

const express = require('express');
const router = express.Router();
const libroCtrl = require('../controllers/libros');
const multipart = require('connect-multiparty'); //subir imagenes ↓
var md_upload = multipart({ uploadDir: './uploads/libros' });


router.post('/add', libroCtrl.addLibro);
router.put('/update/:id', libroCtrl.updateLibro);
router.post('/imagen/:id', md_upload, libroCtrl.uploadImage);
router.get('/getimagen/:imagenfile', libroCtrl.getImagen);
router.get('/all', libroCtrl.getLibros);
router.get('/getone/:id', libroCtrl.getLibro);
router.put('/uploadimagen/:id', libroCtrl.fileUpload);
// router.get('/obtimagen/:imagen', libroCtrl.getImagenFile);

module.exports = router;