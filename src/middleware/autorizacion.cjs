//para paginas que requieren login
const jwt = require("jsonwebtoken");
const {config} = require('dotenv') //Para ocultar credenciales
config(); 

module.exports = async (req,res,next) => {
    try {
        const jwtToken = req.header("token");

        //verificar que hay token
        if(!jwtToken){
            return res.status(403).json("No estas autorizado");
        }

        //verificar que si sea el token
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user

    } catch (error) {
        console.error(error.message);
        return res.status(403).json("No estas autorizado");
    }
};