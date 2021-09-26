/**Modelo de mongoose que nos permitira poner ciertas restricciones a que mi BD
 * luzca de la manera que yo quiero
 */

 const { Schema, model } = require('mongoose');

 /**Esta es la definicion de cada uno de los registros que van a estar dentro de mi tabla */
 const HospitalSchema = Schema ({
     nombre: {
         type: String,
         required: true
     },
     img: {
         type: String,
         
     },
     usuario: {
         required: true,
         type: Schema.Types.ObjectId,
         ref: 'Usuario'
     }
 }, { collection: 'hospitales' }); //collection: 'hospitales' asi cambiamos el nombre en la BD para que no nos aparezca como hospitls
 
 /**Aqui quito el atributo password del json para que no muestre */
 HospitalSchema.method('toJSON', function() {
     const { __V, ...object} = this.toObject();
     return object;
 })
 
 /**Ahora vamos a implementar el modelo */
 module.exports = model( 'Hospital', HospitalSchema );