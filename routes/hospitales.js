/**
 * Hospitales
 * ruta: /api/hospitales 
 */

 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validarCampos } = require('../middlewares/validar-campos');
 
 const { validarJWT } = require('../middlewares/validar-jwt');

 const { getHospitales, crearHospitales, actualizarHospitales, borrarHospitales } = require('../controllers/hospitales_controller');
 
 const router = Router();
 
 router.get( '/', getHospitales );
 
 /**Para implementar un middleware debemos mandar como segundo argumento 
  * y el tercero ya es el controlador, cuando vamos a implementar varios
  * middleware lo hacemos dentro de los corchetes
  */
 router.post( '/',
     [
         validarJWT,
         check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
         validarCampos
     ], 
     crearHospitales
 );
 
 /**'/id' es para mandar el id del ususario que queremos actualizar */
 router.put( '/:id',
     [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
         validarCampos
     ], 
     actualizarHospitales 
 );
 
 router.delete( '/:id',
     validarJWT,
     borrarHospitales 
 );
 
 
 // Exportamos el router
 module.exports = router;