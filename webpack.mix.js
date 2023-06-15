let mix = require("laravel-mix");

require("./mix");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const fs = require('fs');

let destPath;
try {
    const pathConfig = JSON.parse(fs.readFileSync('.destination-path.json', 'utf8'));
    destPath = pathConfig.destPath;

    console.log('destPath:', destPath);
} catch(error) {
    console.log('Error reading .destination-path.json:', error.message);
}

mix
  .setPublicPath("dist")
  .js("resources/js/field.js", "js")
  .sourceMaps()
  .vue({ version: 3 })
  .sass("resources/sass/field.scss", "css")
  .nova("elbytes/nova-nested-form").
  webpackConfig({
    plugins: []
        .concat(
            destPath ? [
                new CopyPlugin({
                    patterns: [
                        {
                            from: 'dist',
                            to: path.resolve(__dirname, destPath)  + '/dist',
                            force: true
                        },
                        {
                            from: 'resources',
                            to: path.resolve(__dirname, destPath)  + '/resources',
                            force: true
                        },
                        {
                            from: 'src',
                            to: path.resolve(__dirname, destPath)  + '/src',
                            force: true
                        },
                    ]
                })
            ] : []
        )
  });

module.exports = {};
