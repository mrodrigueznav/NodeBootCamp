const express = require('express');
const db = require('../models')
const router = express.Router();

const Usuariodb = db.Usuario
const Empleadodb = db.Empleado

router.get('/', async (req, res) => {
    const allUsuarios = await Usuariodb.findAll({
        // include: [{model: Empleadodb}]
    })
    res.status(200).send(allUsuarios);
});

router.get('/:id', async (req, res) => {
    const { id } =  req.params
    const usuario = await Usuariodb.findByPk(id)
    res.status(200).send(usuario);
});

router.post('/', async (req, res) => {
    const {username, password} = req.body
    const userexists = await Usuariodb.findOne({
        where: {
            username
        }
    })
    if (userexists) {
        return res.status(400).send('Ese nombre de usuario ya existe')
    }
    const newUser = await Usuariodb.create({
        username,
        password
    })
    return res.status(200).send(newUser)
})

module.exports = router;