const express = require('express')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const Joi = require('joi');
const router = express.Router();

const sucursales  = [
    { id: 1, nombre: 'Mexico'},
    { id: 2, nombre: 'Gustavo Baz'},
    { id: 3, nombre: 'Guadalajara'},
]

router.get('/', [auth, admin], (req, res) => {
    res.status(200).send(sucursales);
});

router.get('/:id', (req, res) => {
    const sucursal = sucursales.find(i => i.id === parseInt(req.params.id))
    if (!sucursal) res.status(400).send('Esa sucursal no existe')
    res.status(200).send(sucursal);
});

router.post('/', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        x: Joi.number(),
    })

    const r = schema.validate(req.body)
    if (r.error) {
        res.status(400).send(r.error.message)
        return
    }

    const {name, x} = req.body
    const sucursal = {
        id: sucursales.length + 1,
        name: name,
        x: x
    }
    sucursales.push(sucursal);
    res.send(sucursales);
});

router.put('/:id', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const r = schema.validate(req.body)
    if (r.error) {
        res.status(400).send(r.error.message)
        return
    }

    const sucursal = sucursales.find(i => i.id === parseInt(req.params.id))
    const oldSucursal = JSON.parse(JSON.stringify(sucursal));
    if (!sucursal) res.status(400).send('Esa sucursal no existe')

    const { name } = req.body
    sucursal.nombre = name

    const response = {
        status: 'Success',
        old: oldSucursal,
        new: sucursal,
    }
    
    res.send(response);
})

router.delete('/:id', (req, res) => {
    const sucursal = sucursales.find(i => i.id === parseInt(req.params.id))
    if (!sucursal) res.status(400).send('Esa sucursal no existe')

    const index = sucursales.indexOf(sucursal)
    sucursales.splice(index,1)
    
    res.send(sucursales);
})

module.exports = router;