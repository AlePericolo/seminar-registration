const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = async (env, argv) => {

	const isDevelopment = argv.mode === 'development';
	const HOST = process.env.HOST || 'localhost';
	const PORT = process.env.PORT || 3000;

	return {
		mode: argv.mode,
		cache: false,
		entry: path.resolve(__dirname, "src/index.js"),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'js/[name]-[hash].min.js',
		},
		plugins: [
			new webpack.ProgressPlugin(),
			new CopyWebpackPlugin({
				patterns: [
					//{ from: "src/assets/js", to: "assets/js" },
					{ from: "src/assets/images", to: "assets/images" },
					{ from: "src/assets/icons", to: "assets/icons" }
				],
			}),
			new HtmlWebpackPlugin({
				showErrors: true,
				template: require("html-webpack-template"),
				prefix: "/",
				appMountId: "root",
				minify: true,
				favicon: 'src/assets/icons/favicon.ico',
				title: "Seminar Registration",
			}),
			new MiniCssExtractPlugin({
				filename: "/assets/css/[name]-[hash].css",
			}),
			...hotReloadPlugin(isDevelopment),
			...buildCleaner(isDevelopment)
		],
		cache: false,
		context: path.resolve(__dirname),
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					use: 'babel-loader',
					exclude: /node_modules/
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								publicPath: '/assets/css/',
							},
						},
						'css-loader',
					],
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						"style-loader",
						"css-loader",
						"sass-loader",
					],
				},
				{
					test: /\.(png|jpg|gif)$/i,
					use: [
						{
							loader: 'url-loader',
							options: {
								mimetype: 'image/png'
							}
						}
					]
				},
				{
					test: /\.svg$/,
					use: [{
						loader: 'file-loader',
						options: {
							publicPath: '/assets/fonts',
							outputPath: `/assets/fonts`,
						}
					}]
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								publicPath: '/assets/fonts',
								outputPath: `/assets/fonts`,
								esModule: false,
							},
						},
					],
				}
			]
		},
		resolve: {
			extensions: ['.js', '.jsx'],
			alias: {
				'@': path.resolve(__dirname, 'src/'),
				'@common': path.resolve(__dirname, 'src/react/common')
			},
		},
		devServer: {
			compress: true,
			historyApiFallback: true,
			host: HOST,
			open: true,
			port: PORT,
			static: [
				{
					publicPath: '/'
				}
			]
		},
	};
};
const buildCleaner = (isDevelopment) => {
	return isDevelopment ? [] : [new CleanWebpackPlugin()];
}
const hotReloadPlugin = (isDevelopment) => {
	return isDevelopment ? [new webpack.HotModuleReplacementPlugin()] : [];
}