 const nodemailer = require('nodemailer');

const sendMails = (mails,content) => {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
      //  service: 'gmail',
        auth: {
            user: 'trans.dig.gih4pc@gmail.com', // Cambiar x email
            pass: 'gih4pcUps21E' // Cambiar x tu password
        }
    }); 


    // var mails = [`"${listaEmails}"`]
    // console.log(formulario)
    const mailOptions = {
        from: 'Remitente',
        to: mails, 
        subject: 'Notificacion de un nuevo test',
        html: `<strong>${content}</strong> <br/>
        
        <strong> Link del nuevo test:</strong> <br/>
        ${url_front}+'/'+${cuestionario._id}`
//         html: `
//  <strong>Nombre:</strong> ${formulario.nombre} <br/>
//  <strong>E-mail:</strong> ${formulario.email} <br/>
//  <strong>Mensaje:</strong> ${formulario.mensaje}`
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}
module.exports = {
    sendMails
}