const express = require('express');
const Joi = require('joi');
const app = express();
const logger = require('./logger')
const sucursales = require('./routes/sucursales')

app.use(express.json());
app.use(logger)

app.use('/sucursales', sucursales)

app.get('/', (req, res) => {
    res.status(200).send('Hola Mundo');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Iniciado en puerto ${port}`));