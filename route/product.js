const express = require('express')
const product = express.Router()
const ProductController = require('../controller/ProductController')
const session = require('express-session')


product.get("/product", ProductController.listAllProduct)

product.get("/product/buy/:id", ProductController.buyProduct)

product.get("/product/add", ProductController.addProduct)
product.post("/product/add", ProductController.saveProduct)

product.get("/product/delete/:id", ProductController.deleteProduct)

product.get("/product/receipt/:id", ProductController.viewReceipt);

module.exports = product