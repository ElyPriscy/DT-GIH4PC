const { response } = require('express');
mail = require('../utils/configMensaje.js');

// Encriptar contraseña
const bcryptjs =  require('bcryptjs');

/** Importamos el modelo */
const Usuario = require('../models/usuario_model');
const { generarJWT } = require('../helpers/jwt');


/**
 * 
 * Leer
 * 
 */
const getUsuarios = async (req, res) => {

    /**Paginacion: nos permite traer informacion en grupo */
    const desde = Number(req.query.desde) || 0;
    //console.log(desde);

    /**Aqui en el find es donde vamos aplicar la paginacion con el skip y el limit*/
    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit( 5 ),
        
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });
    
}
const getUsuario = (req, res) => {
    let idUser = req.params.id;
    let body = req.body;
    /**Aqui en el find es donde vamos aplicar la paginacion con el skip y el limit*/
    // const [ usuarios, total ] = await Promise.all([
        Usuario.findById(idUser,body,(err,userDB)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            res.json({
                ok:true,
                userDB
            })
        })
    // ]);  
}
const getUsuariosMails = async (req, res) => {

    /**Paginacion: nos permite traer informacion en grupo */
    const desde = Number(req.query.desde) || 0;
    //console.log(desde);

    /**Aqui en el find es donde vamos aplicar la paginacion con el skip y el limit*/
    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'email'),
        
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });
    var listaEmails =[]
    usuarios.forEach(data=>{
        listaEmails.push(data.email)
    })
    mail.sendMails(listaEmails)
    console.log(listaEmails)
}

/**
 * 
 * Crear
 * 
 */
const crearUsuarios = async (req, res = response) => {

    //console.log( req.body );
    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        /**Encriptar contrase;a, SALT nos ayuda a generar data de manera aleatoria */
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        // Grabar en la BD
        await usuario.save();

        // Generar el token - JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...revisar los log'
        });
    }

}

/**
 * 
 * Actualizar
 * 
 */
const actualizarUsuario = async (req, res = response) => {
    
    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    
    try{

        const usuarioDB = await Usuario.findById( uid );

        /** Si es que no existe el usuario */
        if( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
        
        // Actulizacion

        /**{ password, google, ...campos} de esta manera extraigo los campos, 
         * borro de la data informacion que yo no quiero que es
         * obligatoria en la parte de mi mongoose, es decir de lo que viene de mi modelo,
         * si es que no le quitamos entonces le vamos a caer encima a nuestro password y a 
         * la bandera de google que no quiero cambiar.*/
        const { password, google, email, ...campos} = req.body;

        // !== si es diferente
        if( usuarioDB.email !== email ){
            
            const existeEmail = await Usuario.findOne({ email });

            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        // Si no es un usuario de google
        if ( !usuarioDB.google) {
            campos.email = email;
        } else if ( usuarioDB.email !== email ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no puede cambiar su correo'
            });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}

/**
 * 
 * Borrar
 * 
 */
const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;
    try{

        const usuarioDB = await Usuario.findById( uid );

        /** Si es que no existe el usuario */
        if( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getUsuarios,
    getUsuario,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario,
    getUsuariosMails
}