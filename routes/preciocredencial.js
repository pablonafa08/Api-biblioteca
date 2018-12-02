'use strict'

const express = require('express');
const router = express.Router();
const precioCtrl = require('../controllers/preciocredencial');

router.post('/add', precioCtrl.addPrecio);
router.put('/update/:id', precioCtrl.updatePrecio);
router.get('/all', precioCtrl.getPrecio);


module.exports = router;