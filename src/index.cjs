// Este archivo es para arrancar el servidor
const express = require('express'); //Importa modulo express que es un FrameWork
const morgan = require('morgan'); //Importa el modulo morgan que es un middleware de registro HTTP
const cors = require('cors'); //Imporata el modulo de cors

const taskRoutes = require('./routes/sk.routes.cjs');

const app = express(); //app sera una instacia de express

app.use(cors());//Permite comunicar 2 servidores
app.use(morgan('dev')); //Para ver por consola las peticiones
app.use(express.json()) ;//Para que entineda las peticiones post en formato json //req body


app.use(taskRoutes);

app.use((err,req,res,next) => {
    return res.json({
        message: err.message
    })
});//middleware para errores

app.listen(4000) //Inicia el servidor, y la app recibira solicitudes en este puerto
console.log('Server on port 4000')