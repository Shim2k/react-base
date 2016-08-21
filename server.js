var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3001));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

/**
 * Handle requests
 */

var EXAMPLE_JSON = path.join(__dirname, 'example.json');

app.get('/api/example', function(req, res) {
    fs.readFile(EXAMPLE_JSON, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});



app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});


/**
 * development only:
 * Allowing webpack-dev-server to proxy requests to the express server above
 */

var devPort = '8080';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');


var options = {
    hot: true,
    historyApiFallback: true,
    proxy: {
        "*": "http://localhost:" + app.get('port')
    }
};

new WebpackDevServer(webpack(config), options).listen(devPort, 'localhost', function (err, result) {

    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:' + devPort);
});