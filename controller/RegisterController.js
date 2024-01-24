"use strict";
const { User, Profile} = require("../models")
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer')


class Controller {
    static home(req, res){
        const err = req.query.err
        res.render("home", {err})
    }

    static loginPost(req, res){
        const {username, password, role} = req.body
        User.findOne({
            where: {username}
        })
        .then(data => {
            if(data){
                const checkPassword = bcrypt.compareSync(password, data.password) 
                if(checkPassword){
                    req.session.userId = data.id
                    return res.redirect("/store")
                }else{
                    const text = "Cek Dulu Gak Sih Password Sama Username"
                    return res.redirect(`/?err=${text}`)
                }
            }else{
                const text = "Cek Dulu Gak Sih Password Sama Username"
                return res.redirect(`/?err=${text}`)
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

   static registerForm(req, res) {
       res.render('LoginForm')
   }

   static saveRegister(req,res) {

      const { firstName, lastName, phoneNumber, username, password, email, gender, dateOfBirth, role } = req.body
      User.create({
          username,
          password,
          role
      },{
          returning : true
      })
      .then(data => {
        const id = data.id
        return Profile.create({
            firstName, 
            lastName, 
            phoneNumber, 
            gender, 
            dateOfBirth, 
            role, 
            email,
            UserId : id
        })
      })
      .then(data => {
          res.redirect("/")
      })
      .catch(err => {
          const error = {}
        if(err.name === "SequelizeValidationError"){
            err.errors.forEach(el =>{
                if(error[el.path]){
                    error[el.path].push(el.message)
                }else{
                    error[el.path] = [el.message]
                }
            })
        }
        res.send(error)
      })
   }
   static editProfile(req, res) {
    const profile = req.params.id   
    Profile.findOne({
           where: {
                id : profile
           }
       })
       .then(data => {
           res.render("editprofile", {data})
       })
       .catch(err=>{
           res.send(err)
       })
   }
   static editSave(req, res) {
       const {firstName, lastName, phoneNumber, email, gender, dateOfBirth} = req.body
       const msg = `Profil Anda Berhasil Di Update`
       const dated = new Date(dateOfBirth)
       Profile.update({
           firstName,
           lastName,
           phoneNumber,
           email,
           gender,
           dateOfBirth : dated
       },{where : {
           id : req.params.id
       }})
       .then(data => {
           res.redirect(`/store?msg=${msg}`)
       })
       .catch(err => {
        const error = {}
        if(err.name === "SequelizeValidationError"){
            err.errors.forEach(el =>{
                if(error[el.path]){
                    error[el.path].push(el.message)
                }else{
                    error[el.path] = [el.message]
                }
            })
        }
        res.send(error)
       })
   }
   static getlogout(req, res) {
        req.session.destroy((err)=>{
            if(err) res.send(err)
            else{
                res.redirect("/")
            }
        })
   }

   static postLogin(req, res,){

   }

   
}

module.exports = Controller