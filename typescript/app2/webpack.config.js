const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const FederatedTypesPlugin = require('@module-federation/typescript');
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
    ],
  },
  devtool: false,
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
    new FederatedTypesPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
