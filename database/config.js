const mongoose = require('mongoose');

/** Creamos una funcion la cual vamos a llamar para que
 *  establezca la conexion
 */
const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB online');

    } catch(error){
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }


}

module.exports = {
    dbConnection
}