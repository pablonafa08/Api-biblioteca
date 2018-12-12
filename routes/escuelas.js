'use strict'

const express = require('express');
const router = express.Router();
const escuelaCtrl = require('../controllers/escuelas');

router.post('/add', escuelaCtrl.addEscuela);
router.put('/update/:id', escuelaCtrl.updateEscuela);
router.get('/all', escuelaCtrl.getEscuelas);
router.get('/getone/:id', escuelaCtrl.getEscuela);


module.exports = router;