'use strict'

const express = require('express');
const router = express.Router();
const comentarioCtrl = require('../controllers/comentarios_lib');

router.post('/add', comentarioCtrl.addComentario);
router.put('/update/:id', comentarioCtrl.updateComentario);
router.get('/all/:id', comentarioCtrl.getComentariosXLibro);
router.get('/alls', comentarioCtrl.getComentarios);

module.exports = router;