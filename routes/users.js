'use strict'

const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/users');
const multipart = require('connect-multiparty'); //subir imagenes ↓
var md_upload = multipart({ uploadDir: './uploads/usuarios' });

router.post('/add', usuarioCtrl.addUsuario);
router.put('/update/:id', usuarioCtrl.updateUsuario);
router.get('/all', usuarioCtrl.getUsuarios);
router.get('/getone/:id', usuarioCtrl.getUsuario);
router.post('/imagen/:id', usuarioCtrl.uploadImage);
router.get('/getimagen/:imagenfile', md_upload, usuarioCtrl.getImagen);
router.put('/uploadimagen/:id', usuarioCtrl.fileUpload);


module.exports = router;