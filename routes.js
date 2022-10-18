const express = require('express');
const sucursales = require('./routes/sucursales');
const usuarios = require('./routes/usuarios');

module.exports = function routes(app) {
    app.use(express.urlencoded({extended: true}))
    app.use(express.json());
    app.use('/api/sucursales', sucursales)
    app.use('/api/usuarios', usuarios)
}