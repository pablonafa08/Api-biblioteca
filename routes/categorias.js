'use strict'

const express = require('express');
const router = express.Router();
const categoriaCtrl = require('../controllers/categorias');

router.post('/add', categoriaCtrl.addCategoria);
router.put('/update/:id', categoriaCtrl.updateCategoria);
router.get('/all', categoriaCtrl.getCategorias);
router.get('/getone/:id', categoriaCtrl.getCategoria);


module.exports = router;