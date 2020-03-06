import * as webpack from 'webpack';
import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

const config: webpack.Configuration = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : false,
  entry: {
    app: [
      path.resolve(__dirname, '../client/index.tsx')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../public/assets'),
    filename: isDev ? 'bundle.js' : '[name].[hash].js',
    publicPath: 'http://localhost:8000/assets/'
  },
  module: {
    exprContextCritical: false,
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, '../client'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          },
          'ts-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../views/index.html'),
      template: path.resolve(__dirname, './tpl/index.html'),
      inject: true,
      alwaysWriteToDisk: true,
      minify: isProd ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      } : undefined,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ]
};

if (isDev) {
  config.devServer = {
    contentBase: path.join(__dirname, '../dist'),
    publicPath: '/assets/',
    hot: true,
    port: 8000,
    historyApiFallback: true,
    serveIndex: true
  };
}

export default config;