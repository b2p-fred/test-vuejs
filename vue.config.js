module.exports = {
  // Enable Hot-Reloading with vue-cli-service serve
  devServer: {
    watchOptions: {
      poll: true,
    },
  },

  // Support for IE 11/Safari 9
  transpileDependencies: [
    'vuetify'
  ],

  pwa: {
    name: 'My front app'
  }
}
