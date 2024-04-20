// Funciones que usaea routes, es para que se vea mas organizado 
const pool = require('../db.cjs');

const getAllUsuarios = async (req,res) => {
    
    try {
        const allusuarios = await pool.query("SELECT * FROM usuario");
        res.json(allusuarios.rows); //Lado del cliente
    } catch (error) {
        console.log(error.message);
    }
    //console.log(allusuarios); Mostrar el json por consola
    //res.send('Retornando usuarios'); Lado del cliente
}

const getUsuario = (req,res) => {
    res.send('Retornando 1 usuario');
}

const createUsuario = async (req,res) => {
    const {id, rol, nombre, apellidos, correo, clave, telefono, fecha, pais} = req.body; //Cuerpo de la peticion suele ser un json

    try {

        const result = await pool.query("INSERT INTO usuario (id,rol,nombre,apellidos,correo,clave,telefono,fecha,pais) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",[
            id, rol, nombre, apellidos, correo, clave, telefono, fecha, pais,
        ]); //Comando y luego arreglo con los valores que recibe del json del body de arriba
    
        console.log(result.rows[0]);
        res.send('Creando un usuario');
        
    } catch (error) {
        //Pueden ser tipo, que ya hay una primary key
        console.log(error.message);
        res.json({error: error.message}); //son las respuestas al lado del ciente
    }

}

const deleateUsuario = (req,res) => {
    res.send('Eliminando un usuario');
}

const updateUsuario = (req,res) => {
    res.send('Actualizando un usuario ');
}

module.exports = {
    getAllUsuarios,
    getUsuario,
    createUsuario,
    deleateUsuario,
    updateUsuario
}