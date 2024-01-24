const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./route/index')
const session = express('express-session')

app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")



app.use(route)

// // NODEMAILER
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: "volcanoreturn32@gmail.com",
//         pass: "conanian32"
//     }
//   })
//     const sendMail = (email2) => {
//     const options = {
//         from: "'volcanoreturn32@gmail.com" ,
//         to: email2,
//         subject: "Selamat datang di bukaBesok",
//         text: "Selamat datang di Buka Besok"
//     };
//     transporter.sendMail(options, (err, info) => {
//         if (err) console.log(err)
//         console.log(`Email terkirim: ${email2}`)
//     })
//  }
//  sendMail(`fikarsuwardi@gmail.com`)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })