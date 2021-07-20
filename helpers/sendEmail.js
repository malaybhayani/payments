
var nodemailer = require('nodemailer');
var sendEmail = function(req, toEmail, subject, body, cb){
    var smtpTransport = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'negarit',
          pass: 'Negarit@2010ET'
        }
      });
    var mailOptions = {
        to: toEmail,
        from: 'passwordreset@gtmiya.com',
        subject: subject,
        text: body
      };
    smtpTransport.sendMail(mailOptions, cb);
}

module.exports.sendEmail = sendEmail;
