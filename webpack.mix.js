let mix = require("laravel-mix");

require("./mix");

mix
  .setPublicPath("dist")
  .js("resources/js/field.js", "js")
  .sourceMaps()
  .vue({ version: 3 })
  .sass("resources/sass/field.scss", "css")
  .nova("elbytes/nova-nested-form");

module.exports = {};
