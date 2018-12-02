'use strict'

const express = require('express');
const router = express.Router();
const puestoCtrl = require('../controllers/puestos');

router.post('/add', puestoCtrl.addPuesto);
router.put('/update/:id', puestoCtrl.updatePuesto);
router.get('/all', puestoCtrl.getPuestos);
router.get('/getone/:id', puestoCtrl.getPuesto);


module.exports = router;