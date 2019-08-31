// vue.config.js
module.exports = {
    publicPath: './',
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'https://www.baidu.com/sugrec?',  // target host
                ws: true,  // proxy websockets
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/api': ''  // rewrite path
                }
            },
        }
    }
};