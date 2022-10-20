const config = require('config')
const express = require('express');
const app = express();
const morganMiddleware = require('./middleware/morgan')
const error = require('./middleware/error')
const logger = require('./utils/logger')
const helmet = require('helmet')
const db = require('./models/')

app.use(helmet())
app.use(morganMiddleware)
require('./routes')(app)



app.get('/', (req, res) => {
    logger.info('Probando')
    res.status(200).send({codigo: 'XYZ', mensaje: 'Hola Mundo'});
});

// db.sequelize.sync()
//     .then(() => {
//         console.log('Synced')
//     })
//     .catch((err) => {
//         console.log(err.message)
//     })

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Iniciado en puerto ${port}`));