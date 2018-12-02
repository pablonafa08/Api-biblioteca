'use strict'

const express = require('express');
const router = express.Router();
const libroPreCtrl = require('../controllers/lib_prestados');

router.post('/add', libroPreCtrl.addLibPrestado);
router.put('/update/:id', libroPreCtrl.updateLibPrestado);
router.get('/all', libroPreCtrl.getLibPrestados);
router.get('/getone/:id', libroPreCtrl.getPrestamo);
router.get('/fecha/:fecha', libroPreCtrl.comprobarFecha);
router.get('/dias/:fecha', libroPreCtrl.contarDiasRetraso);
router.get('/allday', libroPreCtrl.getLibDevueltosDay);
router.get('/alldev', libroPreCtrl.getLibPrestadosyDev);
router.get('/allbyuser/:id', libroPreCtrl.getLibPrestadosyDevByUsuario);
router.get('/alltodos', libroPreCtrl.getLibPrestadosTodos);
router.get('/porfechatiempo', libroPreCtrl.ordenadoporFechasATiempo);
router.get('/porfecharetraso', libroPreCtrl.ordenadoporFechasConRetraso);

module.exports = router;