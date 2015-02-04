var request = require('request');
var config = require('../webpack.config');
var host = process.env.WDS_HOST || '127.0.0.1';
var port = process.env.WDS_PORT || 8080;
var bundles = Object.keys(config.entry).map(function(name) {
    return config.output.publicPath + config.output.filename.replace('[name]', name);
});

var wdsProxy = function(req, res, next) {
    if (bundles.indexOf(req.path.replace(/\.map$/, '')) > -1) {
        request('http://' + host + ':' + port + req.path).pipe(res);
    } else {
        next();
    }
}

module.exports = wdsProxy;
