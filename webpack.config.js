var path = require('path');
var webpack = require('webpack');

module.exports = {
    // entry: ['./view/teacher/jsx_webpack/teacherViewWebpack'],
    entry: {
        'bundle': './demo/entry'
    },
    output: {
        path: path.join(__dirname, 'demo'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            // 不解析/node_modules/中的js
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!postcss-loader!less-loader'
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!postcss-loader!sass-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    // externals对象的key是给require时用的，比如require('react')
    // 对象的value表示的是如何在global（即window）中访问到该对象，这里是window.React
    // 同理jquery的话就可以这样写：'jquery': 'jQuery'，那么require('jquery')即可。
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'jquery': 'jQuery'
    },
    devtool: 'source-map',
    debug: true,
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compressor: {
        //         warnings: false
        //     }
        // }),
        // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};