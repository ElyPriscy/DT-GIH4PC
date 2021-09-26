const { json } = require("express");
const jwt = require('jsonwebtoken');
const Usuario =  require('../models/usuario_model');

const validarJWT = ( req, res, next ) => {

    // leer el Toke
    const token = req.header('x-token');

    //console.log(token);

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try{

        const { uid } =  jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        
        next();

    }catch(error){
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }


}

/**Validacion para que un usuario normal no pueda hacer cambios */
const validarADMIN_ROLE = async( req, res, next ) => {

    const uid = req.uid;

    /**Si es ADMIN_ROL le dejamos pasar caso contrario no*/
    try {

        const usuarioDB = await Usuario.findById(uid);
        
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if ( usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const validarADMIN_ROLE_o_MismoUsuario = async( req, res, next ) => {

    const uid = req.uid;
    const id = req.params.id;

    /**Si es ADMIN_ROL le dejamos pasar caso contrario no*/
    try {

        const usuarioDB = await Usuario.findById(uid);
        
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if ( usuarioDB.role === 'ADMIN_ROLE' || uid === id ) {

            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}