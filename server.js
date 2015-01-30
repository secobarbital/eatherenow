var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var iface = process.env.SERVER_IFACE || '0.0.0.0';
var port = config.entry[0].split(':')[2];

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  publicPath: config.output.publicPath,
  hot: true
}).listen(port, iface, function(err, result) {
  if (err) {
    console.error(err);
  }
  console.log('Listening at', iface + ':' + port);
});
