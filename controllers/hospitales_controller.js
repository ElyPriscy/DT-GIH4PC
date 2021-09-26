const { response } = require('express');
const Hospital = require('../models/hospital_model');

const getHospitales = async( req, res = response ) => {

    /**Populate nos permite mostrar los datos del usuario en el json al consultar */
    const hospitales = await Hospital.find().populate('usuario', 'nombre img');

    res.json({
        ok: true,
        // aqui muestra el listado de todos los hospitales
        hospitales
    })

}

const crearHospitales = async( req, res = response ) => {

    // obtener el id del usuario
    const uid = req.uid;
    const hospital =  new Hospital( {
        usuario: uid,
        ...req.body // campos que viene desde el body
    } );

    try{

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
   

}

const actualizarHospitales = async( req, res = response ) => {

    // Aqui obtenemos el id de la ruta del hospital o del hospital
    const id = req.params.id;
    //id del usuario, esto obtenemos del JWT
    const uid = req.uid;

    try{
        
        const hospitalDB = await Hospital.findById( id );

        if( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por el id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado =  await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true } );

        res.json({
            ok: true,
            hospital: hospitalActualizado
            
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}

const borrarHospitales = async( req, res = response ) => {

    // Aqui obtenemos el id de la ruta del hospital o del hospital
    const id = req.params.id;

    try{
        
        const hospitalDB = await Hospital.findById( id );

        if( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por el id'
            });
        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
            
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
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}