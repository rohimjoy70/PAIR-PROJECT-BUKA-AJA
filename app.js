const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const nodemailer = require('nodemailer');
const route = require("./route/index");
const session = express("express-session");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(route);

// NODEMAILER
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: "sandrogay@gmail.com",
//         pass: "conanian32"
//     }
//   })
//     const sendMail = (email2) => {
//     const options = {
//         from: "'sandrogay@gmail.com" ,
//         to: email2,
//         subject: "Selamat datang di Otw Buka",
//         text: "Selamat datang di Otw Buka"
//     };
//     transporter.sendMail(options, (err, info) => {
//         if (err) console.log(err)
//         console.log(`Email terkirim: ${email2}`)
//     })
//  }
//  sendMail(`rohimjoy70@gmail.com`)

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
