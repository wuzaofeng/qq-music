const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title:
      'QQ音乐 - 千万正版音乐海量无损曲库新歌热歌天天畅听的高品质音乐平台！',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'keywords',
        content:
          '音乐,音乐网站,mp3下载,音乐下载,在线听歌,正版音乐,歌词,歌词翻译,MV,新歌热歌,经典老歌,音乐排行榜,空间背景音乐,播放器,高品质音乐,无损音乐,电台,专辑,歌单,歌手'
      },
      {
        name: 'name',
        content:
          'QQ音乐 - 千万正版音乐海量无损曲库新歌热歌天天畅听的高品质音乐平台！'
      },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/scss/main.scss'],
  router: {
    linkActiveClass: 'active'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
