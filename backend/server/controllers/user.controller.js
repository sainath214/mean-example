/**
 * @api {post} /login Login
 * @apiName Login
 * @apiGroup User
 * @apiParam {String} email_id      User's email id
 * @apiParam {String} password      User's Password 
 * @apiParam {String} [device_id]   Optional - Device ID if login from mobile device
 */
exports.login = (req, res) => {

    var requiredFields = {
        'email': 'email',
        'password': 'string'
    };

    var params = req.body;

    if (vh.validate(res, requiredFields, params)) {
        model.User.findOne({ where: { 'email': params.email, 'password': params.password, 'status': 1 } })
            .then(data => {
                if (data) {
                    var userData = JSON.parse(JSON.stringify(data));
                    delete userData.password;
                    cres.send(res, userData, "Logged in successfully");
                } else {
                    cres.error(res, "Please check username and password");
                }
            }).catch(err => {
                cres.statusError(res);
            });
    }
}