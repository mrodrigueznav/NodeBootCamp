const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models')
const auth = require('../middleware/auth')
const router = express.Router();

const Usuariodb = db.Usuario
const Empleadodb = db.Empleado

router.get('/me', auth, async (req, res) => {
    const usuario = await Usuariodb.findOne({
        where: {
            usuario: req.token.usuario
        }
    })
    res.send(usuario)
})

router.post('/', async (req, res) => {
    const { password} = req.body

    const existeUsuario = await Usuariodb.findOne({
        where: {
            usuario
        }
    })
    if (!existeUsuario) return res(400).send('Usuario invalido')

    const validarPassword = await bcrypt.compare(password, existeUsuario.password)
    if (!validarPassword) return res.status(400).send('Password Invalido')

    const token = jwt.sign({usuario: existeUsuario.usuario, isAdmin: false}, 'pincheGSI')
    res.header('x-auth-token', token).send(existeUsuario)

    // return res.send(token)
});

module.exports = router;