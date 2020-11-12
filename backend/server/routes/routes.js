var Router = require('express').Router();
var controllers = require('../controllers');

const routes = [

    Router.post("/login", controllers.user.login),
    Router.post("/product/add", controllers.product.addProduct),
    Router.post("/product/update/:id", controllers.product.updateProduct),
    Router.get("/products", controllers.product.getAllProducts),
    Router.get("/product/details/:id", controllers.product.getProductDetails),
    Router.delete("/product/delete/:id", controllers.product.deleteProduct),


];

module.exports = routes;
