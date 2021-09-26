 const nodemailer = require('nodemailer');

const sendMails = (mails,content) => {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
      //  service: 'gmail',
        auth: {
            user: 'appdisups@gmail.com', // Cambiar x email
            pass: '97KVOesvQziS' // Cambiar x tu password
        }
    }); 


    // var mails = [`"${listaEmails}"`]
    // console.log(formulario)
    const mailOptions = {
        from: 'Remitente',
        to: mails, 
        subject: 'Notificacion de un nuevo test',
        html: `<strong>${content}</strong> <br/>`
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