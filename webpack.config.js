//
// WebPack config file

var webpack = require('webpack');

module.exports = {
    plugins: [],
    module: {
        rules: []
    }
};
// The app's starting file
module.exports.entry = "./src/index.js";

// The final app's JS output file
module.exports.output = {
    path: __dirname + "/dist/",
    filename: "portalui.min.js",
    libraryTarget:"var",
    library:"PortalUI"
};
// Output a sourcemap
module.exports.devtool = "source-map";

// Compile support for ES6 classes and React etc
// module.exports.module.rules.push({
//     test: /\.js$/,
//     exclude: /node_modules/,
//     loader: 'babel-loader',
//     query: {
//         presets: ["env"]
//     }
// });


module.exports.module.rules.push({
    test: /(\.png|\.svg|\.jpg)$/,
    loader: "url-loader"
});

// Ensure there's only one file, even if we use requires with callbacks
module.exports.plugins.push(new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}));
