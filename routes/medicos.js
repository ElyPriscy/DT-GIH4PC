/**
 * Medicos
 * ruta: /api/medicos 
 */

 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validarCampos } = require('../middlewares/validar-campos');
 
 const { validarJWT } = require('../middlewares/validar-jwt');

 const { getMedico, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos_controller');
 
 const router = Router();
 
 router.get( '/', getMedico );
 
 /**Para implementar un middleware debemos mandar como segundo argumento 
  * y el tercero ya es el controlador, cuando vamos a implementar varios
  * middleware lo hacemos dentro de los corchetes
  */
 router.post( '/',
     [
         validarJWT,
         check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
         check('hospital', 'El hospital id debe ser valido').isMongoId(), // Esto es para validar el id del hospital
         validarCampos
         
     ], 
     crearMedico
 );
 
 /**'/id' es para mandar el id del ususario que queremos actualizar */
 router.put( '/:id',
     [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(), // Esto es para validar el id del hospital
        validarCampos
     ], 
     actualizarMedico 
 );
 
 router.delete( '/:id',
     validarJWT,
     borrarMedico 
 );
 
 
 // Exportamos el router
 module.exports = router;