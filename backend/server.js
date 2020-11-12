const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

global.db = require('./server/config/sequelize.config');
global.model = require('./server/models');
/*
This will include helpers we use through out application
*/
global.cres = require('./server/helpers/response.helper.js');
global.vh = require('./server/helpers/validator.helper.js');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST,DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With,Authorization, X-HTTP-Method-Override, Content-Type, Accept');
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    global.baseurl = ' http://' + req.get('host') + '/';

    next();
});

const routes = require('./server/routes/routes');

app.use('/api', routes);

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('*', function (req, res) {
    res.send('Are you lost ?');
});

const server = require('http').Server(app);

const port = process.env.PORT || 3300;
server.listen(port);