var webpack = require('webpack');

var release = (process.env.NODE_ENV === 'production');

var plugins = [
    new webpack.NormalModuleReplacementPlugin(/^react$/, 'react/addons'),
    //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
];

var jsxLoader = ['jsx?harmony'];

if (release)  {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            // This has effect on the react lib size
            'NODE_ENV': JSON.stringify('production'),
        },
    }));

    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
    jsxLoader = ['react-hot', 'jsx?harmony'];
}

var config = module.exports = {
    debug: !release,
    cache: !release,
    devtool: !release && 'inline-source-map',
    entry: {
        'bundle': './src/index',
        //vendor: ['react/addons', 'react-router', 'bows', 'fluxxor', 'lodash'] //, 'lunr', 'moment', 'node-uuid', 'superagent', 'tcomb-validation', 'react-textarea-autosize', 'react-playground']
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].js',
        publicPath: '/',
    },
    plugins: plugins,
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['jsx?harmony'] },
            { test: /\.jsx$/, loaders: jsxLoader },
        ],
    },
};
