const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: './',
    configureWebpack: {
        performance: {
            hints: false
        }
    },
    devServer: {
        historyApiFallback: true,
        allowedHosts: 'all',
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',  // 目标接口域名
                changeOrigin: true,  // 是否跨域
                pathRewrite: {
                    '^/api': ''   // 重写接口
                }
            }
        }

    }
})

