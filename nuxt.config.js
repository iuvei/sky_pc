require("babel-polyfill");
const isProd = process.env.NODE_ENV === "production";
module.exports = {
  // debug: true,
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: " ",
    meta: [
      { charset: "utf-8" },
      { version: " " },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "renderer", content: "webkit" },
      { name: "force-rendering", content: "webkit" },
      { "http-equiv": "X-UA-Compatible", content: "IE=Edge,chrome=1" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#e93248" },
  render: {
    bundleRenderer: {
      cache: require("lru-cache")({
        max: 1000,
        maxAge: 1000 * 60 * 15
      })
    }
  },
  router: {
    middleware: ["auth"]
  },
  /*
  ** Build configuration
  */
  build: {
    // vendor: ["axios"],
    /*
    ** Run ESLint on save
    */
    // 移除console
    uglify: {
      uglifyOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === "production"
        }
      }
    },
    vendor: ["axios", "babel-polyfill"],
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },
    loader: [
      {
        test: /\.scss$/,
        loader: "scss-loader"
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",
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
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "img/[name].[hash:7].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  // modules: ["~modules/typescript", "@nuxtjs/proxy"],
  plugins: ["~plugins/index", { src: "~plugins/vue-iview.js", ssr: false }],
  css: ["~assets/reset.css", "~static/main.css"]
};
