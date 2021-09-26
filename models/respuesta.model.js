const { Schema, model } = require('mongoose');

 /**Esta es la definicion de cada uno de los registros que van a estar dentro de mi tabla */
 const RespuestaSchema = Schema ({
    descripcion: {
        type: String,
        required: true
    },
    tipoRespuesta: {
        type: Schema.Types.Mixed
    }
    // preguntaId: {
    //      type: Schema.Types.ObjectId,
    //      ref: 'Pregunta', 
    //      required: true
    //  },
 });

/**Aqui quito el atributo password del json para que no muestre */
RespuestaSchema.method('toJSON', function() {
    const { __V, ...object} = this.toObject();
    return object;
})

 /**Ahora vamos a implementar el modelo */
module.exports = model( 'Respuesta', RespuestaSchema );