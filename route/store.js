const express = require('express')
const store = express.Router()
const StoreController = require('../controller/StoreController')


store.get("/store", StoreController.listStore)

store.get("/store/add", StoreController.addStore)
store.post("/store/add", StoreController.saveStore)

store.get("/store/:id", StoreController.listProductAtStore)
store.get("/store/delete/:id", StoreController.deleteStore)

module.exports = store