const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const px2rem = require('postcss-px2rem')
// 配置基本大小
const postcss = px2rem({
    // 基准大小 baseSize，需要和rem.js中相同
    remUnit: 16
})

module.exports = {
    publicPath: './',
    lintOnSave: false,
    productionSourceMap: true,
    devServer: {
        proxy: {
            "/mailchimp": {
                target: "https://network.us20.list-manage.com/subscribe",
                changeOrigin: true,
                pathRewrite: {
                    "^/mailchimp": ""
                }
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js').set('@', resolve('src'))
        config.resolve.symlinks(true)
        config.resolve.extensions[('vue', 'json', 'js')]
        config.plugin('html').tap(args => {
            args[0].title = 'Ethanim'
            return args
        })
    },
    css: {
        extract: false,
        sourceMap: false,
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            },
            postcss: {
                plugins: [
                    postcss
                ]
            }
        },
    },
}
