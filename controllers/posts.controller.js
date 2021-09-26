const { response } = require('express');
const Post = require('../models/post.model');

// Este get es para visualizar publicamente
const getListPost = async ( req, res = response ) => {

    //const uid = req.uid;    
    //console.log(uid)
    const post = await Post.find().populate('usuario', 'nombre');
    res.json({
        ok: true,
        post
    })
}

// Este get es para visualizar los cuestionarios creados por el usuario ya autenticado en los cards
const getPostByIdUser = async ( req, res = response ) => {

    const uid = req.uid;    
    //console.log(uid)
    const post = await Post.find({usuario: uid})//.populate('usuario', 'nombre')
                                        ;//.populate('hospital', 'nombre img')
    res.json({
        ok: true,
        post
    })
}

/* Este get es para visualizar el contenido del post en especifico dentro del usuario autenticado */
const getVerContenidoPost = async ( req, res = response ) => {

    const id =  req.params.id;  
    //console.log(id)
    
    const post = await Post.findById(id);
    
    //let data =  JSON.stringify(cuestionarios);
    //res = data;
    //console.log(data);
    res.json({
        //ok: true,
        post
        //msg: "Ver Cuestionario"
    })
}

const crearPost = async( req, res = response ) => {

    //Obtenemos el id del usuario
    const uid = req.uid;
    const post = new Post({
        usuario: uid,
        ...req.body
    });

    try {

    const postDB = await post.save();

        res.json({
            ok: true,
            post: postDB
       })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Consulte con el administrador'
        })
    }
    
}

const actualizarPost = async( req, res = response ) => {

    // Aqui obtenemos el id de la ruta del post 
    const id = req.params.id;
    //id del usuario, esto obtenemos del JWT
    const uid = req.uid;

    try {
        
        const postDB = await Post.findById( id );

        if( !postDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Post no encontrado por el id'
            });
        }

        const cambiosPost = {
            ...req.body,
            usuario: uid
            
        }
        console.log(uid)

        const postActualizado =  await Post.findByIdAndUpdate( id, cambiosPost, { new: true } );

        res.json({
            ok: true,
            post: postActualizado
            
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const borrarPost = async( req, res = response ) => {

    // Aqui obtenemos el id de la ruta del hospital o del hospital
    const id = req.params.id;

    try {
       
        const postDB = await Post.findById( id );

        if( !postDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Post no encontrado por el id'
            });
        }

        await Post.findByIdAndDelete( id );

       res.json({
           ok: true,
           msg: 'Post eliminado'
           
       });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

module.exports = {
    getListPost,
    getPostByIdUser,
    getVerContenidoPost,
    crearPost,
    actualizarPost,
    borrarPost
}