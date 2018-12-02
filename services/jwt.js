'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = '1estanoesunaclave2';
exports.createToken = function(bibliotecario) {
    var payload = {
        sub: bibliotecario._id,
        // name: user.name,
        // lastName1: user.lastName1,
        // lastName2: user.lastName2,
        // tel: user.tel,
        // email: user.email,
        // //address: user.address,
        // role: user.role,
        // birthday: user.birthday,
        // income: user.income,
        // status: user.status,
        nombres: bibliotecario.nombres,
        app: bibliotecario.app,
        apm: bibliotecario.apm,
        calle: bibliotecario.calle,
        numero: bibliotecario.numero,
        colonia: bibliotecario.colonia,
        cp: bibliotecario.cp,
        telefono: bibliotecario.cp,
        correo: bibliotecario.correo,
        // puesto: { type: schema.ObjectId, ref: 'Puesto' }, //puesto
        horario: bibliotecario.horario,
        estatus: bibliotecario.estatus,
        // contra: String
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
};