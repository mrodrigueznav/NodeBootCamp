const express = require('express')
const db = require('../models')
const router = express.Router();

const usersdb = db.users

router.get('/', async (req, res) => {
    const allUsuarios = await usersdb.findAll()
    res.status(200).send(allUsuarios);
});

router.get('/:id', (req, res) => {
    // const sucursal = sucursales.find(i => i.id === parseInt(req.params.id))
    // if (!sucursal) res.status(400).send('Esa sucursal no existe')
    // res.status(200).send(sucursal);
});

router.post('/', async (req, res) => {
    const {username, password} = req.body
    const userexists = await usersdb.findOne({
        where: {
            username
        }
    })
    console.log(userexists)
    if (userexists) {
        return res.status(400).send('Ese nombre de usuario ya existe')
    }
    const newUser = await usersdb.create({
        username,
        password
    })
    return res.status(200).send(newUser)
})

module.exports = router;