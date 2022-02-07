// const { generateModifyVars } = require('./build/generate/generateModifyVars')

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const webpack = require('webpack');
const CracoLessPlugin = require("craco-less");
const path = require("path");
const { loaderByName } = require("@craco/craco");

const plugins = [
  new CompressionWebpackPlugin({
    algorithm: "gzip",
    test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
    threshold: 1024,
    minRatio: 0.8,
  }),
];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true,
        },
      },
      sourceMap: false,
      parallel: true,
    })
  );
}
module.exports = {
  webpack: {
    alias: {
      // 别名配置
      "@": path.resolve(__dirname, "src"),
    },
    // 配置CDN 外部资源不打包
    externals: {
      echarts: "echarts",
    },
    // // 开发服务的配置
    // devServer: {
    //   proxy: {
    //     "/api": {
    //       target: "http://localhost:3001",
    //       changeOrigin: true,
    //       pathRewrite: {
    //         "^/api": "/api",
    //       },
    //     },
    //   },
    // },
    // devServer: {
    //   // 端口，默认8080
    //   port: "8099",
    //   // 进度条
    //   progress: true,
    //   // 启动后访问目录，默认是项目根目录，这个设置到打包后目录
    //   contentBase: "./build",
    //   // 启动压缩
    //   //compress: true
    // },
    plugins: [
      // 删除console debugger
      ...plugins,
      //   new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  },
  babel: {
    plugins: [
      ["import", { libraryName: "antd", style: true }],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
    ],
  },

  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule(lessRule, context) {
          // You have to exclude these file suffixes first,
          // if you want to modify the less module's suffix
          lessRule.exclude = /\.m\.less$/;
          return lessRule;
        },
        modifyLessModuleRule(lessModuleRule, context) {
          // Configure the file suffix
          lessModuleRule.test = /\.m\.less$/;

          // Configure the generated local ident name.
          const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
          cssLoader.options.modules = {
            localIdentName: "[local]_[hash:base64:5]",
          };

          return lessModuleRule;
        },
        // cssLoaderOptions: {
        //   modules: {
        //     localIdentName: "[local]__[hash:base64:5]",
        //     // 回调必须返回 `local`，`global`  默认global
        //     mode: (resourcePath) => {
        //       if (/(modules|local)\.(less|css)$/i.test(resourcePath)) {
        //         return "local";
        //       }
        //       return "global";
        //     },
        //   },
        // },

        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // hack: `true; @import (reference) "${path.resolve(
              //   "src/design/config.less"
              // )}";`,
            },
            javascriptEnabled: true,
            //配置全局less 变量，不需要在使用的地方导入了
            //  globalVars: {
            //    hack: `true; @import (reference) "${path.resolve(
            //     "src/design/config.less"
            //   )}";`,
            }
          },
        },
      },
    },
  ],
};
