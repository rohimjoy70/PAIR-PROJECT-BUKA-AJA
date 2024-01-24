"use strict";
const { User, Profile, Store, Product } = require("../models")
const convertDate = require("../helpers/convertDate")
const { Op } = require("sequelize");

class Controller {
    static listStore(req, res) {
        const msg = req.query.msg
        let store;
        Store.findAll()
            .then(data => {
                store = data
                return Profile.findAll()
            })
            .then(data1 => {
                console.log(data1);
                res.render("listStore", { store, convertDate, data1, msg })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static listProductAtStore(req, res) {
        const id = +req.params.id
        Product.findAll({
            include: Store,
            where: {
                StoreId: id,
            }
        })
            .then(data => {
                const money = new Product()
                const store = data[0].Store
                res.render("productByStore", { data, store, money })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addStore(req, res) {
        const category = Store.category
        User.findAll()
            .then(data => {
                res.render("addStore", { category, data })
            })
            .catch(err => {
                res.send(err)
            })

    }
    static saveStore(req,res){
          const {name, category, since, UserId}= req.body
            const dated = new Date(since)
          Store.create({
              name,
              category,
              since : dated,
              UserId
          }) 
          .then((data) => {
              res.redirect("/store")
          })
          .catch(err=>{
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

}
module.exports = Controller