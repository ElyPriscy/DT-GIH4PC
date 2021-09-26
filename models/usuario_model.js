/**Modelo de mongoose que nos permitira poner ciertas restricciones a que mi BD
 * luzca de la manera que yo quiero
 */

const { Schema, model } = require('mongoose');

/**Esta es la definicion de cada uno de los registros que van a estar dentro de mi tabla */
const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
});

/**Aqui quito el atributo password del json para que no muestre */
UsuarioSchema.method('toJSON', function() {
    /**Aqui extraemos la version, el id, el pass y todo el resto del objeto*/
    const { __V, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

/**Ahora vamos a implementar el modelo */
module.exports = model( 'Usuario', UsuarioSchema );