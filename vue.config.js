const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const px2rem = require('postcss-px2rem')
const postcss = px2rem({
    remUnit: 16
})

module.exports = {
    publicPath: '/',
    lintOnSave: false,
    productionSourceMap: true,
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
