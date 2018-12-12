'use strict'

const express = require('express');
const router = express.Router();
const corteCtrl = require('../controllers/corte_caja');

router.post('/add', corteCtrl.addCorte);
router.get('/all', corteCtrl.allCortes);
router.get('/getone/:id', corteCtrl.comprobarCorte);


module.exports = router;