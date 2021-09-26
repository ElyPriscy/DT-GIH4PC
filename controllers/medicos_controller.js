const { response } = require('express');
const Medico = require('../models/medicos_model');

const getMedico = async( req, res = response ) => {

    const medicos = await Medico.find().populate('usuario', 'nombre img')
                                        .populate('hospital', 'nombre img');//.populate('hospital', 'nombre img')

    res.json({
        ok: true,
        medicos
    })

}

const crearMedico = async( req, res = response ) => {

    //Obtenemos el id del usuario
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try{

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Consulte con el administrador'
        })
    }
    
 

}

const actualizarMedico = async( req, res = response ) => {

    // Aqui obtenemos el id de la ruta del hospital o del hospital
    const id = req.params.id;
    //id del usuario, esto obtenemos del JWT
    const uid = req.uid;

    try{
        
        const medicoDB = await Medico.findById( id );

        if( !medicoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por el id'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado =  await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true } );

        res.json({
            ok: true,
            medico: medicoActualizado
            
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}

const borrarMedico = async( req, res = response ) => {

   // Aqui obtenemos el id de la ruta del hospital o del hospital
   const id = req.params.id;

   try{
       
       const medicoDB = await Medico.findById( id );

       if( !medicoDB ) {
           return res.status(404).json({
               ok: false,
               msg: 'Medico no encontrado por el id'
           });
       }

       await Medico.findByIdAndDelete( id );

       res.json({
           ok: true,
           msg: 'Medico eliminado'
           
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
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
}