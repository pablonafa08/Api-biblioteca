'use strict'

const express = require('express');
const router = express.Router();
const bibliotecarioCtrl = require('../controllers/bibliotecarios');

router.post('/add', bibliotecarioCtrl.addBibliotecario);
router.put('/update/:id', bibliotecarioCtrl.updateBibliotecario);
router.get('/all', bibliotecarioCtrl.getBibliotecarios);
router.get('/getone/:id', bibliotecarioCtrl.getBibliotecario);
router.post('/login', bibliotecarioCtrl.login);



module.exports = router;