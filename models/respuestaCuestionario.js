/**Modelo de mongoose que nos permitira poner ciertas restricciones a que mi BD
 * luzca de la manera que yo quiero
 */

 const { Schema, model } = require('mongoose');

 /**Esta es la definicion de cada uno de los registros que van a estar dentro de mi tabla */
 const respuestaCuestionarioSchema = Schema ({
    
    nombreParticipante: {
        type: String,
        //required: true
    },
    fechaCreacion: {
       type: Date,
       //default: Date.now()
    },
    puntosTotales: {
        type: Number
    },
    cuestionarioId: {
        type: String,
        //required: true
    },
    listRespuestasUsuario: {
        type: Schema.Types.Array,
        //required: true
    },
 });

/**Aqui quito el atributo password del json para que no muestre */
respuestaCuestionarioSchema.method('toJSON', function() {
    const { __V, ...object} = this.toObject();
    return object;
})

 /**Ahora vamos a implementar el modelo */
module.exports = model( 'respuestaCuestionario', respuestaCuestionarioSchema );