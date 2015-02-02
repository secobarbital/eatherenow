var webpack = require('webpack');
var host = process.env.DEV_SERVER_HOST || 'localhost';
var port = process.env.DEV_SERVER_PORT || 2992;

var prod = process.env.NODE_ENV === 'production';

var config = {
    entry: './src/index',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [
        { test: /\.jsx$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ },
        { test: /\.json$/, loader: 'json', exclude: /node_modules/ }
      ]
    },
    resolve: {
      modulesDirectories: ['node_modules', 'bower_components'],
      extensions: ['', '.js', '.jsx']
    }
};

if (!prod) {
    config.devtool = 'eval';
    config.entry = [
        'webpack-dev-server/client?http://' + host + ':' + port,
        'webpack/hot/only-dev-server',
        config.entry
    ];
    config.plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ];
}

module.exports = config;
