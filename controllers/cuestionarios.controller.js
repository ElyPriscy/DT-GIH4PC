const { response, json } = require('express');

const Cuestionario = require('../models/cuestionario.model');
const Respuesta = require('../models/respuesta.model');
mail = require('../utils/configMensaje.js');
const Usuario = require('../models/usuario_model');
// Este get es para visualizar publicamente
const getListCuestionarios = async ( req, res = response ) => {

    //const uid = req.uid;    
    //console.log(uid)
    const cuestionarios = await Cuestionario.find().populate('usuario', 'nombre')
                                                   
                                        ;//.populate('hospital', 'nombre img')
    res.json({
        ok: true,
        cuestionarios
    })
}

// Este get es para visualizar los cuestionarios en los cards creados por el usuario ya autenticado
const getCuestionariosByIdUser = async ( req, res = response ) => {

    const uid = req.uid;    
    //console.log(uid)
    const cuestionarios = await Cuestionario.find({usuario: uid})//.populate('usuario', 'nombre')
                                        ;//.populate('hospital', 'nombre img')
    res.json({
        ok: true,
        cuestionarios
    })
}

/* Este get es para visualizar un cuestionario en especifico dentro del usuario autenticado */
const getVerCuestionario = async ( req, res = response ) => {

    const id =  req.params.id;  
    //console.log(id)
    
    const cuestionarios = await Cuestionario.find({ _id: id});
    
    //let data =  JSON.stringify(cuestionarios);
    //res = data;
    //console.log(data);
    res.json({
        //ok: true,
        cuestionarios
        //msg: "Ver Cuestionario"
    })
}

const crearCuestionarios = async ( req, res = response ) => {
    

    /**Extraemos el id del usuario de quien esta grabando
     * uid => id del usuario
     */
    const uid = req.uid;
    //console.log(uid)

    /**
       el req.body contiene todo lo que tenemos en el model cuestionario, es decir
       el nombre, la descripcion, la fecha, si esta activo, etc.
      
       Ahora mandamos el uid antes de guardar, es decir antes del save, para ello desestructuramos
       new Cuestionario y vamos a mandar todo lo que esta en el body con el ...req.body y con el 
       uid del usuario
     */
    const [ usuarios ] = await Promise.all([
        Usuario
            .find({}, 'email'),
        
        Usuario.countDocuments()
    ]);
    
    const cuestionario = new Cuestionario({
        usuario: uid,
        ...req.body
    });
    var listaEmails =[]
    usuarios.forEach(data=>{
        listaEmails.push(data.email)
    });
        	
    try {

        const cuestionarioDB = await cuestionario.save();
        // enviar correo
        console.log('****************************')
        console.log(req.body)
        console.log(uid)
        res.json({
            ok:true,
            cuestionario: cuestionarioDB})
        
    //  console.log(listaEmails);
    // mail.sendMails(listaEmails,req.body.nombre)
    // console.log(listaEmails)   
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

const actualizarCuestionarios = ( req, res = response ) => {
    res.json({
        ok:true,
        msg:'actualizarCuestionarios'
    })
}

const borrarCuestionarios = async ( req, res = response ) => {

    const id = req.params.id; 
    //console.log(id)
    try {

        const cuestionario = await Cuestionario.findById( id );

        if ( !cuestionario ) {

            return res.status(404).json({
                ok:true,
                //msg: uid
                msg:'Cuestionario no encontrado por id'
            });
        }

        await Cuestionario.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Cuestionario borrado'
        })
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
        
    }
}

module.exports = {
    getCuestionariosByIdUser,
    getListCuestionarios,
    getVerCuestionario,
    crearCuestionarios,
    actualizarCuestionarios,
    borrarCuestionarios,
}