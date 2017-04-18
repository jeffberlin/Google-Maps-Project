var path = require("path")

module.exports = {
	devtool: 'sourcemap',
  entry: {
    app: ["./app/js/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  }},
  devServer: {
  	contentBase: './app'
  }
}