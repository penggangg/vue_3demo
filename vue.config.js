module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://uatservice.winzct.com:4430', // 接口域名
                changeOrigin: true // 是否跨域
            }
        }
    },
    configureWebpack: (config) => {
        config.externals = {
            ZCTEncrypt: 'window.ZCTEncrypt'
        };
    }

};
