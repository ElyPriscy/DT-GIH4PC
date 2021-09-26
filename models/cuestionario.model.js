/**Modelo de mongoose que nos permitira poner ciertas restricciones a que mi BD
 * luzca de la manera que yo quiero
 */

 const { Schema, model } = require('mongoose');

 /**Esta es la definicion de cada uno de los registros que van a estar dentro de mi tabla */
 const CuestionarioSchema = Schema ({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaCreacion: {
       type: Date,
       default: Date.now()
    },
    listPreguntas: {
        type: Schema.Types.Array,
        ref: 'Pregunta', 
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true
    }
 });

/**Aqui quito el atributo password del json para que no muestre */
CuestionarioSchema.method('toJSON', function() {
    const { __V, ...object} = this.toObject();
    return object;
})

 /**Ahora vamos a implementar el modelo */
module.exports = model( 'Cuestionario', CuestionarioSchema );