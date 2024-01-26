"use strict";
const { User, Profile, Store, Product } = require("../models");
const convertDate = require("../helpers/convertDate");
const { Op } = require("sequelize");

class Controller {
   static async listAllProduct(req, res) {
      try {
         const search = req.query.search;
         let where = {};

         if (search) {
            where.name = {
               [Op.iLike]: `%${search}%`,
            };
         }

         const data = await Product.findAll({
            where,
            include: Store,
         });

         res.render("allProduct", { data });
      } catch (err) {
         res.send(err);
      }
   }

   static async buyProduct(req, res) {
      try {
         const id = +req.params.id;

         await Product.decrement({ stock: 1 }, { where: { id } });

         res.redirect(`/store`);
      } catch (err) {
         res.send(err);
      }
   }

   static async addProduct(req, res) {
      try {
         const store = await Store.findAll();

         res.render("addProduct", { store });
      } catch (err) {
         console.log(err)
         res.send(err);
      }
   }

   static async saveProduct(req, res) {
      try {
         const { name, description, price, stock, StoreId, imgURL } = req.body;
         const Nprice = Number(price);
         const Nstock = Number(stock);

         await Product.create({
            name,
            description,
            price: Nprice,
            stock: Nstock,
            StoreId,
            imageURL: imgURL,
         });

         res.redirect(`/store/${StoreId}`);
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
         console.log(err);
         res.send(err);
      }
   }

   static async deleteProduct(req, res) {
      try {
         const id = +req.params.id;

         await Product.destroy({ where: { id } });

         res.redirect(`/store`);
      } catch (err) {
         res.send(err);
      }
   }

   static async viewReceipt(req, res) {
      try {
         const productId = +req.params.id;
         const product = await Product.findByPk(productId);
         const user = req.session.userId;
         const quantity = req.query.quantity || 1;
         const total = product.price * quantity;

         res.render("receipt", { product, quantity, total, user });
      } catch (err) {
         res.send(err);
      }
   }
}

module.exports = Controller;
