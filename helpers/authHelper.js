// var User = require('../models/user');
// var request = require('request');

// const identityServerUrl = "https://auth.dev.hulunfechi.com/";
// // const identityServerUrl = "http://localhost/GoldGIdentity.STS/";

// function getUserInfo(req, callback){
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//         try {
//           var token = req.headers.authorization.split(' ')[1]; 
//           var opts = {
//             url: identityServerUrl + 'connect/userinfo',
//             headers : { 'Authorization': req.headers.authorization }
//           };
//           request(opts, function(error, response, body) {
//               if(error){
//                 console.log("User Info Response Error");
//                 callback(error, null);
//               } else if (response.statusCode == 200) {
//                 var user = JSON.parse(body);
//                 callback(null, user);
//                 console.log("User Info Response Ok");
//               } else {
//                   var errStr = "UserInfo Http status " + response.statusCode + " returned";
//                   callback(errStr, null);
//               }
//           });
//         } catch(err){
//             callback(err, null);
//         }
//     }
// }
// var helper = function(req, jwt_payload, done){
//     User.findOne({openId: jwt_payload.sub}, function(err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             getUserInfo(req, function(err1, user){
//                 if(err1) {
//                     return done(err1, false);
//                     }
//                 var newUser = new User(
//                     { 
//                     openId: user.sub,
//                     username : user.preferred_username, 
//                     first_name: user.name,
//                     last_name: user.lastname,
//                     email: user.email,
//                     email_verified: user.email_verified,
//                     role: user.role == 'admin' || user.role == 'super_admin'? user.role: 'client'
//                     });
        
//                     newUser.save(function(err2, createdUser){
//                         if(err2) {
//                         return done(err2, false);
//                         }
//                         if(createdUser){
//                         return done(null, createdUser);
//                         } else {
//                         return done(null, false);
//                         }
//                     });
//             });
//         }
//     });
// };


// module.exports = {
//     identityServerBaseUrl: identityServerUrl,
//     checkRegistration: helper
// };