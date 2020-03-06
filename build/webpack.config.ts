import * as webpack from 'webpack';
import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import autoprefixer from 'autoprefixer';

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
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: [
                      'chrome >= 47'
                    ]
                  },
                  useBuiltIns: 'usage',
                  corejs: 3
                }], 
                '@babel/preset-react'
              ],
              plugins: [
                'syntax-dynamic-import',
                [
                  'import',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'lib',
                    style: true
                  }
                ]
              ]
            }
          },
        ]
      },
      {
        test: /\.less$/,
        use: [
          isDev && 'style-loader',
          isProd && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            ident: 'postcss',
            options: {
              sourceMap: 'inline',
              plugins: () => [
                autoprefixer({
                  flexbox: 'no-2009',
                  overrideBrowserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
                }),
                // require('cssnano')()
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              modifyVars: {
                // 'primary-color': '#f94628',
              }
            }
          }
        ].filter(Boolean) as any[]
      },
      {
        test: /\.css$/,
        use: [
          isDev && 'style-loader',
          isProd && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            ident: 'postcss',
            options: {
              sourceMap: 'inline',
              plugins: () => [
                autoprefixer({
                  flexbox: 'no-2009',
                  overrideBrowserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
                }),
                // require('cssnano')()
              ],
            },
          },
        ].filter(Boolean) as any[]
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
        loader: 'file-loader?name=[hash].[ext]'
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url-loader?limit=1200&name=[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.scss', '.css'],
    modules: [
      'node_modules',
      'src',
    ],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@docs': path.resolve(__dirname, '../docs'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[name].[chunkhash:5].chunk.css"
    }),
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
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh|en/),
  ],
  optimization: process.env.NODE_ENV === 'devlopment' ? {} : {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        buildup: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          priority: 11,
          reuseExistingChunk: false
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/](antd)[\\/]/,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: false
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ],
  },
};

if (isDev) {
  config.devServer = {
    contentBase: path.join(__dirname, '../views'),
    publicPath: '/assets/',
    hot: true,
    port: 8000,
    historyApiFallback: true,
    serveIndex: true
  };
}

export default config;