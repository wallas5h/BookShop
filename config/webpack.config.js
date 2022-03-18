const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require('webpack-node-externals');


const {
  NODE_ENV = 'production',
} = process.env;



// module.exports = {
//   entry: './src/index.ts',
//   mode: NODE_ENV,
//   target: 'node',
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'index.js'
//   },
//   resolve: {
//     extensions: ['.ts', '.js'],
//   }
// }


module.exports = {
  mode: 'development',
  entry: 'index.ts',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, 'public'),
    port: 5001
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|svg|gif|jpeg)$/,
        use: 'file-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ["@babel/preset-env", { useBuiltIns: 'usage', corejs: '2.6.12' }]
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties"
          ]
        }
      },
      { test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader' },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "templates/template.html",
      title: "nowa aplikacja"
    }),
    new CopyPlugin(
      [
        { from: "public/images", to: "images" },
      ],
    ),
  ]
}