"use strict";
const { User, Profile } = require("../models");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

class Controller {
   static home(req, res) {
      const err = req.query.err;
      res.render("home", { err });
   }

   static async loginPost(req, res) {
      try {
         const { username, password, role } = req.body;
         const data = await User.findOne({
            where: { username },
         });

         if (data) {
            const checkPassword = bcrypt.compareSync(password, data.password);

            if (checkPassword) {
               req.session.userId = data.id;
               return res.redirect("/store");
            } else {
               const text = "Cek Dulu Gak Sih Password Sama Username Udah Bener Belum!!!";
               return res.redirect(`/?err=${text}`);
            }
         } else {
            const text = "Cek Dulu Gak Sih Password Sama Username Udah Bener Belum!!!";
            return res.redirect(`/?err=${text}`);
         }
      } catch (err) {
         res.send(err);
      }
   }

   static registerForm(req, res) {
      res.render("LoginForm");
   }

   static async saveRegister(req, res) {
      try {
         const { firstName, lastName, phoneNumber, username, password, email, gender, dateOfBirth, role } = req.body;
         const user = await User.create({
            username,
            password,
            role,
         });

         const id = user.id;
         await Profile.create({
            firstName,
            lastName,
            phoneNumber,
            gender,
            dateOfBirth,
            role,
            email,
            UserId: id,
         });

         res.redirect("/");
      } catch (err) {
         const error = {};
         if (err.name === "SequelizeValidationError") {
            err.errors.forEach((el) => {
               if (error[el.path]) {
                  error[el.path].push(el.message);
               } else {
                  error[el.path] = [el.message];
               }
            });
         }
         res.send(error);
      }
   }

   static async editProfile(req, res) {
      try {
         const profile = req.params.id;
         const data = await Profile.findOne({
            where: {
               id: profile,
            },
         });

         res.render("editprofile", { data });
      } catch (err) {
         res.send(err);
      }
   }

   static async editSave(req, res) {
      try {
         const { firstName, lastName, phoneNumber, email, gender, dateOfBirth } = req.body;
         const msg = `Profil Anda Berhasil Di Update`;
         const dated = new Date(dateOfBirth);

         await Profile.update(
            {
               firstName,
               lastName,
               phoneNumber,
               email,
               gender,
               dateOfBirth: dated,
            },
            {
               where: {
                  id: req.params.id,
               },
            }
         );

         res.redirect(`/store?msg=${msg}`);
      } catch (err) {
         const error = {};
         if (err.name === "SequelizeValidationError") {
            err.errors.forEach((el) => {
               if (error[el.path]) {
                  error[el.path].push(el.message);
               } else {
                  error[el.path] = [el.message];
               }
            });
         }
         res.send(error);
      }
   }

   static getlogout(req, res) {
      req.session.destroy((err) => {
         if (err) res.send(err);
         else {
            res.redirect("/");
         }
      });
   }

   static async postLogin(req, res) {
      try {
         const { username, password } = req.body;
         const user = await User.findOne({ username });

         if (!user) {
            return res.status(401).send("Invalid username or password");
         }

         const isPasswordValid = await bcrypt.compare(password, user.password);

         if (!isPasswordValid) {
            return res.status(401).send("Invalid username or password");
         }

         const role = user.role;

         req.session.user = { username, role };

         if (role === "admin") {
            return res.redirect("/admin/dashboard");
         } else {
            return res.redirect("/customer/dashboard");
         }
      } catch (error) {
         console.log(error);
         res.send(error);
      }
   }
}

module.exports = Controller;
