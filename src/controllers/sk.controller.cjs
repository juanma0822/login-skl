// Funciones que usara routes, es para que se vea mas organizado 
const pool = require('../../database/db.cjs');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator.cjs');

const getAllUsuarios = async (req,res) => {
    
    try {
        const allusuarios = await pool.query("SELECT * FROM usuario");
        res.json(allusuarios.rows); //Lado del cliente
    } catch (error) {
        console.log(error.message);
    }
}

const getUsuarioId = async (req,res) => {

    try {
        const {id} = req.params;

        const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Usuario no Encontrado'
        }) 

        return res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
}

const deleateUsuario = async (req,res) => {
    
    const {id} = req.params;
    
    try {
        const result = await pool.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]);

        if(result.rowCount === 0) return res.status(404).json({
            message: "usuario not found"
        });

        console.log(result.rows[0]);
        return res.status(204);//estado de que funciono todo bien pero no devuelvo body no devuelvo nada
        //si despues lo quiero cambiar depronto es el sendStatus malo, solo es status
    } catch (error) {
        console.log(error.message)
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
        console.log(error.message)
    }
}
//------------------------------------------------
//PARA EL REGISTRO 

//Crear un usuario
const createUsuario = async (req,res) => {

    //1. Destructuracion
    const {id, rol, nombre, apellidos, correo, clave, telefono, fecha, pais} = req.body; //Cuerpo de la peticion suele ser un json
    
    try {

        //2. Verificar que el Id y correo no existan
        const user = await pool.query("SELECT * FROM usuario where id = $1", [id]);

        if(user.rows.length !== 0){
            return res.status(401).json("El usuario ya se encuentra registrado");
        }

        const email = await pool.query("SELECT * FROM usuario where correo = $1", [correo]);

        if(email.rows.length !== 0){
            return res.status(401).json("Este correo ya se encuentra en uso");
        }

        //3. Bcrypt Contraseñá
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptClave = await bcrypt.hash(clave, salt);

        //4. Agregar Usuario a la BD
        const result = await pool.query("INSERT INTO usuario (id,rol,nombre,apellidos,correo,clave,telefono,fecha,pais) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",[
            id, rol, nombre, apellidos, correo, bcryptClave, telefono, fecha, pais,
        ]); //Comando y luego arreglo con los valores que recibe del json del body de arriba

        //5. Generar el jwt token
        const token = jwtGenerator(result.rows[0].correo,result.rows[0].nombre);
        res.json({token});
        
    } catch (error) {
        //Pueden ser de tipo, que ya hay una primary key
        console.error(error.message);
        res.status(500).json(error.message); //Error del servidor
    }

}

//-------------------------------------------------
//LOGIN y NAVBAR (CUANDO INICIA SESION)

//ruta para el login
const verificarUsuario = async(req,res) => {

    //1. Destrucutrar
    const {correo, clave} = req.body;

    try {

        //2. Verificar si el usuario no existe
        const user = await pool.query("SELECT * FROM usuario where correo = $1", [correo]);

        if(user.rows.length === 0){
            return res.status(401).json("Usuario no registrado");
        }

        //3. Verificar Clave
        const validPassword = await bcrypt.compare(clave, user.rows[0].clave);

        if(!validPassword){
            return res.status(401).json("Contraseña incorrecta")
        }

        //res.json("ACCESSO PERMITIDO")

        //4. responder con jwt token
        const token = jwtGenerator(user.rows[0].correo,user.rows[0].nombre);
        res.json({token});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message); //Error del servidor
    }
}

//Verificar que esta autenticado - Para utenticar inicio de sesion
const isAutenticado = async (req,res) =>{

    //Aca en si la verificacon la hizo el Middleware, si llego a este punto es porque
    //si esta autenticado, por eso se retorna el True
    try {
        res.json(true)
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message); //Error del servidor
    }
}

//accesoRestringido - Obtener el nombre en la navBar
const getUsuaLog = async (req,res) =>{
    try {

        const result = await pool.query('SELECT nombre FROM usuario WHERE correo = $1', [req.correo]);
        res.json(result.rows[0]);

    } catch (err) {

        console.error(err.message)
        res.status(500).send("Error Servidor")

    }
}
//-----------------------------------------------------

module.exports = {
    getAllUsuarios,
    getUsuarioId,
    createUsuario,
    deleateUsuario,
    updateUsuarioId,
    verificarUsuario,
    isAutenticado,
    getUsuaLog
}