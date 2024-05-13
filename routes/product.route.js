const express=require('express');
const Router=express.Router()
const {createProduct,fetchAllProducts,testingProduct} =require('../controllers/product.controller');

Router.post('/createProduct',createProduct)
Router.get('/fetchAllProducts',fetchAllProducts)
Router.get('/testing',testingProduct)

module.exports = Router;