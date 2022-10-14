const Sequelize = require('sequelize')
const config = require('config')

const sequelize = new Sequelize(
    config.get('dbServer.database'),
    config.get('dbServer.user'),
    config.get('dbServer.password'),
    {
        host: config.get('dbServer.host'),
        dialect: config.get('dbServer.dialect')
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db