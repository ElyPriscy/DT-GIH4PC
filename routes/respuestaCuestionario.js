/**
 * respuestaCuestionarios
 * /api/respuestaCuestionarios
 */
 const { Router } = require('express');
 const { check } = require('express-validator');
 const { crearRespuestaCuestionario, getRespuestaUsuario, getRespuestaByIdCuestionario, borrarRespuestaUsuario } = require('../controllers/respuestaCuestionario.controller');
 const { validarCampos } = require('../middlewares/validar-campos');
 
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const router = Router();
 

 router.get( '/:id', getRespuestaUsuario);

 router.get( '/estadisticas/:id', validarJWT, getRespuestaByIdCuestionario);

 router.post( '/', crearRespuestaCuestionario );
 
 router.delete( '/:id',validarJWT, borrarRespuestaUsuario);
 
 
 // Exportamos el router
 module.exports = router;