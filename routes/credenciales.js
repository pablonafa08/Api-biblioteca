'use scrict'

const express = require('express');
const router = express.Router();
const credencialCtrl = require('../controllers/credenciales');

router.post('/add', credencialCtrl.addCredencial);
router.put('/update/:id', credencialCtrl.updateCredencial);
router.get('/allday', credencialCtrl.getCredencialesDay);


module.exports = router;