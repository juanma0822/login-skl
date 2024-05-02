//Archivo config se encargara de solo contener las credenciales de la BD 
const {config} = require('dotenv') //Para ocultar credenciales
config(); //cargar valores de .env


//Estos valores los traera del .env y se llaman con el config()
module.exports = {
    db:{
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    }
}