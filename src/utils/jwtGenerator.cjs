const jwt = require('jsonwebtoken');
const {config} = require('dotenv') //Para ocultar credenciales
config(); 

function jwtGenerator(id){
    const payload = {
        user: id
    };

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"});
}

module.exports = jwtGenerator