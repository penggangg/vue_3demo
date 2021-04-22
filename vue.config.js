const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const tsImportPluginFactory = require('ts-import-plugin'); // ts vant 配置按需加载
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://uatservice.winzct.com:4430', // 接口域名
                changeOrigin: true // 是否跨域
            }
        }
    },
    configureWebpack: config => {
        config.module.rules.unshift({
            test: /\.(jsx|tsx|js|ts)$/,
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                getCustomTransformers: () => ({
                    before: [tsImportPluginFactory({
                        libraryName: 'vant',
                        libraryDirectory: 'es',
                        style: true
                    })]
                }),
                compilerOptions: {
                    module: 'es2015'
                }
            },
            exclude: /node_modules/
        });
        config.externals = {
            ZCTEncrypt: 'window.ZCTEncrypt'
        };
        if (process.env.npm_config_report) {
            config.plugins.push(new BundleAnalyzerPlugin());
        }
    }
    // 链式操作

};
