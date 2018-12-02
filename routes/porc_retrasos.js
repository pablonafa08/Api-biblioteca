'use strict'

const express = require('express');
const router = express.Router();
const retrasoCtrl = require('../controllers/porc_retrasos');

router.post('/add', retrasoCtrl.addRetraso);
router.put('/update/:id', retrasoCtrl.updateRetraso);
router.get('/all', retrasoCtrl.getRetraso);


module.exports = router;