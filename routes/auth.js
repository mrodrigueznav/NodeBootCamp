const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models')
const router = express.Router();

const Usuariodb = db.Usuario
const Empleadodb = db.Empleado

router.post('/', async (req, res) => {
    const {usuario, password} = req.body

    const existeUsuario = await Usuariodb.findOne({
        where: {
            usuario
        }
    })
    if (!existeUsuario) return res(400).send('Usuario invalido')

    const validarPassword = await bcrypt.compare(password, existeUsuario.password)
    if (!validarPassword) return res.status(400).send('Password Invalido')

    const token = jwt.sign({usuario: existeUsuario.usuario, isAdmin: true}, 'pincheGSI')

    return res.send(token)

});

module.exports = router;