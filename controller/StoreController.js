"use strict";
const { User, Profile, Store, Product } = require("../models");
const convertDate = require("../helpers/convertDate");
const { Op } = require("sequelize");

class Controller {
   static async listStore(req, res) {
      try {
         const msg = req.query.msg;
         let store;
         store = await Store.findAll();
         const data1 = await Profile.findAll();
         res.render("listStore", { store, convertDate, data1, msg });
      } catch (err) {
         res.send(err);
      }
   }

   static async listProductAtStore(req, res) {
      try {
         const id = +req.params.id;
         const data = await Product.findAll({
            include: Store,
            where: {
               StoreId: id,
            },
         });
         const money = new Product();
         const store = data[0].Store;
         res.render("productByStore", { data, store, money });
      } catch (err) {
         res.send(err);
      }
   }

   static async addStore(req, res) {
      try {
         const category = Store.category;
         const data = await User.findAll();
         res.render("addStore", { category, data });
      } catch (err) {
         res.send(err);
      }
   }

   static async saveStore(req, res) {
      try {
         const { name, category, since, UserId } = req.body;
         const dated = new Date(since);
         await Store.create({
            name,
            category,
            since: dated,
            UserId,
         });
         res.redirect("/store");
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

   static async deleteStore(req, res) {
      try {
         const storeId = req.params.id;
         await Store.destroy({
            where: {
               id: storeId,
            },
         });
         res.redirect("/store");
      } catch (err) {
         res.send(err);
      }
   }
}
module.exports = Controller;
