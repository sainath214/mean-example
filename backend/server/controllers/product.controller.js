/**
 * @api {post} /product/add 
 * @apiName Adding Product
 * @apiGroup Products
 * @apiParam {String} name      Product Name
 * @apiParam {String} description      Product Description
 * @apiParam {String} price      Product Price
 */
exports.addProduct = (req, res) => {

    var requiredFields = {
        'name': 'string',
        'description': 'string',
        'price': 'float',
    };

    var params = req.body;

    if (vh.validate(res, requiredFields, params)) {
        var productData = {
            name: params.name,
            description: params.description,
            price: params.price,
            status: 1

        }
        console.log(productData);
        model.Products.create(productData).then(data => {
            cres.send(res, data, "Product addded successfully");
        }).catch(err => {
            cres.statusError(res);
        });

    }
}

/**
 * @api {post} /product/update 
 * @apiName updating Product
 * @apiGroup Products
 * @apiParam {String} name      Product Name
 * @apiParam {Text} description      Product Description
 * @apiParam {Float} price      Product Price
  * @apiParam {Boolean} status      Product status
 */
exports.updateProduct = (req, res) => {
    var params = req.body;
    var productId = req.params.id;


    var data = {
        'name': params.name,
        'description': params.description,
        'price': params.price,
        'status': params.status,
    };

    model.Products.update(data, { where: { 'productId': productId } }).then(data => {
        cres.send(res, data, "Product updated successfully");
    }).catch(err => {
        cres.statusError(res);
    });

}

/**
 * @api {post} /products/
 * @apiName Getting all Products
 * @apiGroup Products
 */
exports.getAllProducts = (req, res) => {
    model.Products.findAll({
        attributes: ['productId', 'name', 'description', 'price', 'status'],
        where: { 'status': 1 },
        order: [['productId', 'DESC']]

    }).then(data => {
        if (data)
            cres.send(res, data, 'All the products.');
        else
            cres.send(res, [], 'Sorry, no products found.');

    }).catch(err => {
        console.log(err);
        cres.error(res, 'Error in getting products');
    })
}

/**
 * @api {post} /product/details/:id
 * @apiName Get the product details
 * @apiGroup Products
 */
exports.getProductDetails = (req, res) => {
    var params = req.body;
    var productId = req.params.id;

    model.Products.findOne({
        attributes: ['productId', 'name', 'description', 'price', 'status'],
        where: { 'productId': productId, 'status': 1 },

    }).then(data => {
        if (data)
            cres.send(res, data, 'Product details.');
        else
            cres.send(res, [], 'Sorry, no product found.');

    }).catch(err => {
        console.log(err);
        cres.error(res, 'Error in getting product details');
    })
}

/**
 * @api {post} /product/delete/:id
 * @apiName Product delete
 * @apiGroup Products
 */
exports.deleteProduct = (req, res) => {
    var params = req.body;
    var productId = req.params.id;

    model.Products.destroy({ where: { 'productId': productId } }).then(data => {
        if (data)
            cres.send(res, data, 'Product deleted successfully');
        else
            cres.send(res, [], 'Product not found');
    }).catch(err => {
        cres.error(res);
    });
}