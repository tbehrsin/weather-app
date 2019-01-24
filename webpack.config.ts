import path from "path";
import webpack from "webpack";

import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";

const config: webpack.Configuration = {

  entry: {
    site: ["./src/index.scss", "./src/index.tsx"],
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader", options: { silent: true } },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        exclude: [
          path.resolve(__dirname, "src", "index.scss"),
        ],
        test: /\.scss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          { loader: "css-loader", options: { modules: true, localIdentName: "[hash:8]", camelCase: true } },
          { loader: "resolve-url-loader" },
          { loader: "sass-loader", options: { sourceMap: true, sourceMapContents: false } },
        ],
      },
      {
        include: [
          path.resolve(__dirname, "src", "index.scss"),
        ],
        use: [
          MiniCSSExtractPlugin.loader,
          { loader: "css-loader", options: { modules: false } },
          { loader: "resolve-url-loader" },
          { loader: "sass-loader", options: { sourceMap: true, sourceMapContents: false } },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff2?|png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name]-[hash:8].[ext]",
              publicPath: "/",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html.ejs",
      title: "Weather App",
    }),
    new MiniCSSExtractPlugin({
      allChunks: true,
      filename: "[name].css",
    }),
  ],
};

export default config;
