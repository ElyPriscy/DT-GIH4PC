/**Modelo de mongoose que nos permitira poner ciertas restricciones a que mi BD
 * luzca de la manera que yo quiero
 */

 const { Schema, model } = require('mongoose');

 /**Esta es la definicion de cada uno de los registros que van a estar dentro de mi tabla */
 const MedicoSchema = Schema ({
     nombre: {
         type: String,
         required: true
     },
     img: {
         type: String,
         
     },
     usuario: {
         type: Schema.Types.ObjectId,
         ref: 'Usuario', 
         required: true
     },
     hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }

 }); 
 
 /**Aqui quito el atributo password del json para que no muestre */
 MedicoSchema.method('toJSON', function() {
     const { __V, ...object} = this.toObject();
     return object;
 })
 
 /**Ahora vamos a implementar el modelo */
 module.exports = model( 'Medico', MedicoSchema );