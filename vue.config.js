const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
        .rule("vue")
        .use("vue-svg-inline-loader")
          .loader("vue-svg-inline-loader")
          .options({svgo: false}); // disable svgo to prevent deletion of element ids
  }
})
