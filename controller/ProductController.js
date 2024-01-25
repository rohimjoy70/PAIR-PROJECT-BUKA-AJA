"use strict";
const { User, Profile, Store, Product } = require("../models");
const convertDate = require("../helpers/convertDate");
const { Op } = require("sequelize");

class Controller {
   static listAllProduct(req, res) {
      const search = req.query.search;
      let where = {};

      if (search) {
         where.name = {
            [Op.iLike]: `%${search}%`,
         };
      }
      Product.findAll({
         where,
         include: Store,
      })
         .then((data) => {
            res.render("allProduct", { data });
         })
         .catch((err) => {
            res.send(err);
         });
   }

   static buyProduct(req, res) {
      let id = +req.params.id;
      Product.decrement({ stock: 1 }, { where: { id } })
         .then((_) => {
            res.redirect(`/store`);
         })
         .catch((err) => {
            res.send(err);
         });
   }

   static addProduct(req, res) {
      Store.findAll()
         .then((Store) => {
            res.render("addProduct", { Store });
         })
         .catch((err) => {
            res.send(err);
         });
   }

   static saveProduct(req, res) {
      const { name, description, price, stock, StoreId, imgURL } = req.body;
      const Nprice = Number(price);
      const Nstock = Number(stock);
      Product.create({
         name,
         description,
         price: Nprice,
         stock: Nstock,
         StoreId,
         imageURL:imgURL,
      })
         .then((data) => {
            res.redirect(`/store/${StoreId}`);
         })
         .catch((err) => {
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
            console.log(err)
            res.send(err);
         });
   }

   static deleteProduct(req, res) {
      let id = +req.params.id;
      Product.destroy({ where: { id } })
         .then((_) => {
            res.redirect(`/store`);
         })
         .catch((err) => {
            res.send(err);
         });
   }
}

module.exports = Controller;
