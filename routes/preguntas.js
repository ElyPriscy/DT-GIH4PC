/**
 * Preguntas
 * /api/preguntas
 */
 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validarCampos } = require('../middlewares/validar-campos');
 
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const router = Router();
 
 //router.get( '/', getPreguntas );
 
 /**Para implementar un middleware debemos mandar como segundo argumento 
  * y el tercero ya es el controlador, cuando vamos a implementar varios
  * middleware lo hacemos dentro de los corchetes
  */
 router.post( '/',
   [ 
      validarJWT,
      check('descripcion', 'La descripcion de la pregunta es necesario').not().isEmpty(),
      check('cuestionario', 'El cuestionario id debe ser valido').isMongoId(),
      validarCampos
   ], 
   //crearPreguntas
 );
 
 /**'/id' es para mandar el id del ususario que queremos actualizar */
 router.put( '/:id',
   [],
   
     
 );
 
 router.delete( '/:id',
   [],
    
 );
 
 
 // Exportamos el router
 module.exports = router;