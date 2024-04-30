//para paginas que requieren login
const jwt = require("jsonwebtoken");

const {config} = require('dotenv') //Para ocultar credenciales
config(); //cargar valores de .env

module.exports = async (req,res,next) => {
    try {
        const jwtToken = req.header("token");

        //verificar que hay token
        if(!jwtToken){
            return res.status(403).json("No estas autorizado");
        }

        //verificar que si sea el token
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    
        //Tras pasar el Middleware el req.user de la peticion tendra el payload, en este caso corresponde al correo
        req.user = payload.user;
        req.nombre = payload.nombre;
        next()
        
    } catch (error) {
        console.error(error.message);
        return res.status(403).json("No estas autorizado");
    }
};