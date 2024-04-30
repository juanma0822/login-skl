const jwt = require('jsonwebtoken');
const {config} = require('dotenv') //Para ocultar credenciales
config(); 

function jwtGenerator(email,nom){
    const payload = {
        user: email,
        nombre: nom
    }

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"})
}

module.exports = jwtGenerator