const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    // menu: "./src/menu.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.js"
  },
  // optimization: {
  //   splitChunks: {
  //     // include all types of chunks
  //     chunks: 'all'
  //   }
  // },
  plugins: [
    new HtmlWebpackPlugin({  
      filename: "index.html",
      template: "./src/index.html",
      // inject: true,
      // chunks: ["index"]

      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    // new HtmlWebpackPlugin({
    //   filename: "menu.html",
    //   template: "./src/menu.html",
    //   inject: true,
    //   chunks: ["menu"]
    // }),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    })
  ],

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.(jpg|png|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
              useRelativePath: true,
            }
          }
        ]
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
              useRelativePath: true,
            }
          }
        ]
      },
      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "sound/",
              useRelativePath: true,
            }
          }
        ]
      },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[ext]",
      //         // outputPath: "sound/",
      //         // useRelativePath: true,
      //       }
      //     }
      //   ],
      //   exclude: path.resolve(__dirname, './src/index.html')
      // },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      }
    ],
  },
};