// Funciones que usaea routes, es para que se vea mas organizado 
const pool = require('../db.cjs');

const getAllUsuarios = async (req,res,next) => {
    
    try {
        const allusuarios = await pool.query("SELECT * FROM usuario");
        res.json(allusuarios.rows); //Lado del cliente
    } catch (error) {
        //console.log(error.message);
        next(error);
    }
    //console.log(allusuarios); Mostrar el json por consola
    //res.send('Retornando usuarios'); Lado del cliente
}

const getUsuarioId = async (req,res,next) => {

    try {
        const {id} = req.params;

        const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Usuario no Encontrado'
        }) 

        return res.json(result.rows[0]);
    } catch (error) {
        //console.log(error.message)
        next(error);
    }
}

const createUsuario = async (req,res,next) => {
    const {id, rol, nombre, apellidos, correo, clave, telefono, fecha, pais} = req.body; //Cuerpo de la peticion suele ser un json

    try {

        const result = await pool.query("INSERT INTO usuario (id,rol,nombre,apellidos,correo,clave,telefono,fecha,pais) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",[
            id, rol, nombre, apellidos, correo, clave, telefono, fecha, pais,
        ]); //Comando y luego arreglo con los valores que recibe del json del body de arriba

        res.json(result.rows[0]);
        //console.log(result.rows[0]);
        //res.send('Creando un usuario');
        
    } catch (error) {
        //Pueden ser de tipo, que ya hay una primary key
        //console.log(error.message);
        //res.json({error: error.message}); //son las respuestas al lado del ciente En vez de esto usar el middleware de index
        next(error);
    }

}

const deleateUsuario = async (req,res,next) => {

    const {id} = req.params;

    try {
        const result = await pool.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]);

        if(result.rowCount === 0) return res.status(404).json({
            message: "task not found"
        });

        return res.sendStatus(204);//estado de que funciono todo bien pero no devuelvo body no devuelvo nada
        //console.log(result);
        //res.send('Eliminando un usuario');
    } catch (error) {
        next(error);
    }
}

const updateUsuarioId = async (req,res,next) => {

    try {
        const {id} = req.params;
        const {rol, nombre, apellidos, correo, clave, telefono, fecha, pais, millas} = req.body; //Cuerpo de la peticion suele ser un json

        const result = await pool.query("UPDATE usuario SET rol = $1, nombre = $2, apellidos = $3, correo = $4, clave = $5, telefono = $6, fecha = $7, pais = $8, millas = $9 WHERE id = $10 RETURNING *",[
                rol, nombre, apellidos, correo, clave, telefono, fecha, pais, millas, id,])
        
        if (result.rows.length === 0) return res.status(404).json({
            message: 'Usuario no Encontrado'
        }) 
        res.json(result.rows[0])
        //console.log(id,rol, nombre, apellidos, correo, clave, telefono, fecha, pais, millas);
        //res.send('Actualizando un usuario ');
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsuarios,
    getUsuarioId,
    createUsuario,
    deleateUsuario,
    updateUsuarioId
}