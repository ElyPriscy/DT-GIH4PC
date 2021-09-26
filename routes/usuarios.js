/** 
 * 
 * Ruta: /api/usuarios 
 * 
 * */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario,getUsuariosMails,getUsuario} = require('../controllers/usuarios_controller');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getUsuarios );
router.get( '/:id', getUsuario );

router.get( '/mails', getUsuariosMails );

/**Para implementar un middleware debemos mandar como segundo argumento 
 * y el tercero ya es el controlador, cuando vamos a implementar varios
 * middleware lo hacemos dentro de los corchetes
 */
router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contrase;a es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ], 
    crearUsuarios
);

/**'/id' es para mandar el id del ususario que queremos actualizar */
router.put( '/:id',
    [
        validarJWT,
        validarADMIN_ROLE_o_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    actualizarUsuario 
);

router.delete( '/:id',
    [validarJWT, validarADMIN_ROLE ],
    borrarUsuario 
);


// Exportamos el router
module.exports = router;