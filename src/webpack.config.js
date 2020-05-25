const HTMLWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + './../public/index.html',
	filename: 'index.html',
	inject: 'body'
})
const path = require('path')

module.exports = {
	entry: __dirname + '/index.jsx',
	module: {
		 rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/react',
            {
            'plugins': ['@babel/plugin-proposal-class-properties']
            }
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, '../build/client'),
		publicPath: '/'
	},
	devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/client': 'http://localhost:8080'
    },
    historyApiFallback: true
  },
	plugins: [HTMLWebpackPluginConfig]
}