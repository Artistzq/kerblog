const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({

  lintOnSave: 'warning',

  devServer: {
    open: true,
    port: 7000,
    proxy: {
      '/url': {
        target: 'http://localhost:8080/kerbaltalks/',//这里填入你要请求的接口的前缀
        ws:true,//代理websocked
        changeOrigin:true,//虚拟的站点需要更管origin
        secure: false,                   //是否https接口
        pathRewrite:{
          '^/url':''//重写路径
        },
        headers: {
          referer: 'http://localhost:8080/kerbaltalks/', //这里后端做了拒绝策略限制，请求头必须携带referer，否则无法访问后台
        }
      }, 
      '/auth': {
        target: 'http://localhost:9401/',//这里填入你要请求的接口的前缀
        ws:true,//代理websocked
        changeOrigin:true,//虚拟的站点需要更管origin
        secure: false,                   //是否https接口
        pathRewrite:{
          '^/auth':''//重写路径
        },
        headers: {
          referer: 'http://localhost:9401/', //这里后端做了拒绝策略限制，请求头必须携带referer，否则无法访问后台
        }
      }
    }
  },

  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
