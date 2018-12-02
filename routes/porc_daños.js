'use strict'

const express = require('express');
const router = express.Router();
const danioCtrl = require('../controllers/porc_daños');

router.post('/add', danioCtrl.addDanio);
router.put('/update/:id', danioCtrl.updateDanio);
router.get('/all', danioCtrl.getDanios);
router.get('/getone/:id', danioCtrl.getDanio);


module.exports = router;