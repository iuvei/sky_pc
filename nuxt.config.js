require('babel-polyfill');
const staticConfig = require('./config/staticConfig.json');
const proxy = require('./config/proxy');
const config = {
  env: {
    static: staticConfig.static
  },
  // debug: true,
  /*
  ** Headers of the page
  */
  head: {
    // titleTemplate: '123453',
    meta: [
      { charset: 'utf-8' },
      { version: ' ' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'renderer', content: 'webkit' },
      { name: 'force-rendering', content: 'webkit' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=Edge,chrome=1' }
    ],
    link: [
      { rel: 'preconnect', href: '//upload.bxvip588.com' },
      { rel: 'dns-prefetch', href: '//upload.bxvip588.com' },
      {
        rel: 'preload',
        href: '/fonts/ionicons.ttf',
        type: 'font/ttf'
      },
      {
        rel: 'preload',
        href: '/iveiw.css',
        type: 'text/css'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/iview.css' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#e93248' },
  render: {
    bundleRenderer: {
      cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15
      })
    }
  },
  router: {
    middleware: ['ip', 'auth']
  },
  build: {
    // cache: true,
    // 移除console
    // babel: {
    //   plugins: [
    //     [
    //       'import',
    //       {
    //         libraryName: 'iview',
    //         libraryDirectory: 'src/components'
    //       }
    //     ]
    //   ]
    // },
    uglify: {
      uglifyOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production'
        }
      }
    },
    vendor: ['axios', 'babel-polyfill'],
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // });
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
        // config.module.rules.push({
        //   test: /iview.src.*?js$/,
        //   loader: 'babel-loader',
        //   exclude: /(node_modules)/
        // });
        // config.module.rules.push({
        //   test: /\.js$/,
        //   loader: 'babel-loader',
        //   exclude: /node_modules/
        // });
        // config.module.rules.push({
        //   test: /\.jsx?$/,
        //   loader: 'babel-loader',
        //   exclude: /(node_modules)/
        // });
      }
    },
    loader: [
      {
        test: /iview.src.*?js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.scss$/,
        loader: 'scss-loader'
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  // modules: ["~modules/typescript", "@nuxtjs/proxy"],
  plugins: ['~plugins/index', { src: '~plugins/vue-iview.js', ssr: true }],
  css: [
    // { src: '~assets/iview.min.css', ssr: false },
    '~assets/reset.css',
    '~static/main.css'
  ]
};

if (staticConfig.static) {
  config.modules = ['@nuxtjs/proxy'];
  config.proxy = [[`/${proxy.api}`, { target: proxy.proxy_target }]];
  delete config.router;
}
module.exports = config;
