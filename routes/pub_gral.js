'use strict'

const express = require('express');
const router = express.Router();
const publicoCtrl = require('../controllers/pub_gral');

router.post('/add', publicoCtrl.addPublico);
router.put('/update/:id', publicoCtrl.updatePublico);
router.get('/all', publicoCtrl.getVisitas);


module.exports = router;