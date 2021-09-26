const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {

    /**Aqui nos va a crear un arreglo de errores con todo lo que nos sucedio o
     * pasaron por nuestra ruta de los check
     */
     const errores = validationResult( req );
     if( !errores.isEmpty() ) {
         return res.status(400).json({
             ok: false,
             errors: errores.mapped()
         });
     }

     next();

}

module.exports = {
    validarCampos
}