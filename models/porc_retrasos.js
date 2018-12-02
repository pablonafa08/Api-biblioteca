'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var retrasoSchema = schema({
    porcentaje: Number
});

module.exports = mongoose.model('Retraso', retrasoSchema);