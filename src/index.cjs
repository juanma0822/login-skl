// Este archivo es para arrancar el servidor
const express = require('express'); //Importa modulo express que es un FrameWork
const morgan = require('morgan'); //Importa el odulo morgan que es un middleware de registro HTTP

const taskRoutes = require('./routes/sk.routes.cjs');

const app = express(); //app sera una instacia de express

app.use(morgan('dev')); //Para ver por consola las peticiones
app.use(express.json()) ;//Para que entineda las peticiones post en formato json


app.use(taskRoutes);

app.listen(4000) //Inicia el servidor, y la app recibira solicitudes en este puerto
console.log('Server on port 4000')