const jwt = require('jsonwebtoken')

function validarJWT(req, res, next){
    const token = req.header('x-auth-token')

    try {
        const validToken = jwt.verify(token, 'pincheGSI')
        req.token = validToken
        next()
    } catch (error) {
        res.status(400).send('Invalid Token')
    }

}

module.exports = validarJWT
