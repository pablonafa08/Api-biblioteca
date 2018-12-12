'use strict'

const express = require('express');
const router = express.Router();
const libroDanCtrl = require('../controllers/lib_dañados');

router.post('/add', libroDanCtrl.addLibDaniado);
router.get('/allday/:id', libroDanCtrl.getLibDaniadosDay);


module.exports = router;