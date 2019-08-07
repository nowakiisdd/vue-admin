//webpack 的配置文件
// config  webpack配置
//  resolve webpack解析
// alias 路径别名
const path = require('path')
module.exports = {
    chainWebpack: function (config) { //chainWebpack 链式操作
        config.resolve.alias //config 指的是webpack配置
            .set('assets', path.join(__dirname, './src/assets')) //.set(路径别名， 绝对路径)
            .set('stylesheets', path.join(__dirname, './src/assets/stylesheet'))
            .set('commponents', path.join(__dirname, './src/components'))
            .set('layout', path.join(__dirname, './src/components/layout'))
            .set('common', path.join(__dirname, './src/components/common'))
            .set('lib', path.join(__dirname, './src/lib'))
            .set('pages', path.join(__dirname, './src/pages'))
            .set('router', path.join(__dirname, './src/router'))
            .set('store', path.join(__dirname, './src/store'))
            .set('utils', path.join(__dirname, './src/utils'))
    },
    lintOnSave: true, //关闭语法检测
    devServer: {
        proxy: {
            '/ajax': {//标识符 配置项目  标识符 选择域名后面的第一个
                target: 'http://m.maoyan.com',//目标源
                changeOrigin: true,//将上面的target修改为http://localhost:8080
            },
            '/index.php': {
                target: 'http://www.qinqin.net',
                changeOrigin: true
            }
        }
    }
}