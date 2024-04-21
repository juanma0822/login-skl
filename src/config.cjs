//Archivo config se encargara solo de contener valores que luego usare
const {config} = require('dotenv') //Para ocultar credenciales
config(); //cargar valores de .env


//Estos valores os traera del .env y se llaman con el config()
module.exports = {
    db:{
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    }
}