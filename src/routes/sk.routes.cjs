//URLs que el front va a utilizar para hacer peticiones
const {Router} = require('express');
const {getAllUsuarios, getUsuario, createUsuario, deleateUsuario, updateUsuario} = require('../controllers/sk.controller.cjs')
const router = Router();//Crear nuevas urls


//Obtener lista de usuarios
router.get('/usuarios', getAllUsuarios);

//OObtener 1 usuario
router.get('/usuarios/10', getUsuario);

//Crear un Usuario
router.post('/usuarios', createUsuario);

//Eliminar un Usuario
router.delete('/usuarios', deleateUsuario);

//Actualizar un Usuario
router.put('/usuarios', updateUsuario);

module.exports = router;