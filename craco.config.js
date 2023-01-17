module.exports = {
  webpack: {
    externals: {
      electron: 'electron',
    },
    configure: (webpackConfig, { env, paths }) => {
      console.log(process.env.NODE_ENV)

      if (process.env.NODE_ENV !== 'development') {
        // debugger
        // 修改build的生成文件名称
        paths.appBuild = 'build'
        console.log(webpackConfig.output)
        webpackConfig.output = {
          ...webpackConfig.output,
          publicPath: './',
        }
      }
      return webpackConfig
    },
  },
}
