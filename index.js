const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const sucursales  = [
    { id: 1, nombre: 'Mexico'},
    { id: 2, nombre: 'Gustavo Baz'},
    { id: 3, nombre: 'Guadalajara'},
]

app.get('/', (req, res) => {
    res.status(200).send('Hola Mundo');
});

app.get('/sucursales/', (req, res) => {
    res.status(200).send(sucursales);
});

app.get('/sucursales/:id', (req, res) => {
    const sucursal = sucursales.find(i => i.id === parseInt(req.params.id))
    if (!sucursal) res.status(400).send('Esa sucursal no existe')
    res.status(200).send(sucursal);
});

app.post('/sucursales', (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Iniciado en puerto ${port}`));