const config = require('config')
const express = require('express');
const app = express();
const logger = require('./logger')
const helmet = require('helmet')
const db = require('./models/')

app.use(helmet())
require('./routes')(app)

if (app.get('env') === 'development') {
    app.use(logger)
    console.log('Logger habilitado')
}

app.get('/', (req, res) => {
    res.status(200).send('Hola Mundo');
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