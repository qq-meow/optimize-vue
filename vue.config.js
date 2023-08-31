const PORT = 8082; // 端口
const PROXY = 'https://127.0.0.1';
const CompressionPlugin = require('compression-webpack-plugin')
const HappyPack = require('happypack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    css: {
        extract: !0,
        sourceMap: !1,
        requireModuleExtension: !0
    },
    chainWebpack: config => {
        // 移除 preload(预载) 插件
        config.plugins.delete('preload')
        // 移除 prefetch(预取) 插件
        config.plugins.delete('prefetch')
        // 去掉console
        config.optimization.minimizer('terser').tap((args) => {
            args[0].terserOptions.compress.drop_console = true
            return args
        })
        // 图片压缩
        config.module
            .rule('images')
            .use('imageWebpackLoader')
            .loader('image-webpack-loader')
            .options({
                disable: process.env.NODE_ENV === 'development', // 开发环境下禁止压缩
                gifsicle: {
                    interlaced: false
                }
            })
        // config.module
        //     .rule('js')
        //     .use('thread-loader')
        //     .loader('thread-loader')
    },
    configureWebpack: config => {
        config.module.rules.forEach(ele => {
            console.log(ele.use, 'ttttss')
        })
        
        // 修改alias，现有版本已有配置可以无需修改
        // config.resolve = {
        //     ...config.resolve,
        //     alias: {
        //         'vue$': 'vue/dist/vue.esm.js',
        //         '@': path.resolve(__dirname, './src'),
        //     }
        // }
        // 使用外部cdn方式引入文件，看情况而来。
        // config.externals = {
        //     'vue': 'Vue',
        //     'vue-router': 'VueRouter',
        //     'vuex': 'Vuex',
        //     'element-ui': 'ELEMENT',
        // }
        // gzip 压缩
        config.plugins = [
            ...config.plugins,
            // 开启 gzip 压缩
            new CompressionPlugin({
                filename: '[path][base].gz',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ]
        // 多线程打包
        // config.plugins.push(
        //     new HappyPack({
        //         /*
        //         * 必须配置
        //         */
        //         // id 标识符，要和 rules 中指定的 id 对应起来
        //         id: 'babel',
        //         // 需要使用的 loader，用法和 rules 中 Loader 配置一样
        //         // 可以直接是字符串，也可以是对象形式
        //         loaders: ['babel-loader?cacheDirectory']
        //     })
        // )
        // 监测打包后各个文件的大小，看是否需要优化
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static', // 模式server, static, json, disabled
                analyzerHost: '127.0.0.1', // 默认是127.0.0.1，这个字段在analyzerMode为server模式的时候才会起作用
                analyzerPort: 8889,
                reportFilename: 'report.html', // 生成的文件的名字
                defaultSizes: 'parsed', // stat, parsed, gzip,这个字段决定了当生成了分析文件之后默认的筛选项
                openAnalyzer: true,
                generateStatsFile: false,
                statsFilename: 'stats.json',
                statsOptions: null,
                logLevel: 'info'
            })
        )
        config.optimization.runtimeChunk = 'single'
        // chunk-vend 分包
        config.optimization.splitChunks = {
            chunks: 'all', // 可选值：all，async 和 initial。all功能最强大，所以咱们就使用all
            maxInitialRequests: Infinity, // 最大并行请求数，为了以防万一，设置无穷大即可
            minSize: 20000, // 引入的模块大于20kb才做代码分割，官方默认20000，这里不用修改了
            maxSize: 60000, // 若引入的模块大于60kb，则告诉webpack尝试再进行拆分
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/, // 使用正则匹配node_modules中引入的模块
                    priority: -10, // 优先级值越大优先级越高，默认-10，不用修改
                    name(module) { // 设定分包以后的文件模块名字，按照包名字替换拼接一下
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                        return `npm.${packageName.replace('@', '')}`
                    },
                },
            },
        }
    },
    // 不生成.map文件
    productionSourceMap: false,
    devServer: {
        port: PORT,
        // disableHostCheck: true,
        proxy: {
            '/api': {
                target: PROXY, // 开发
                pathRewrite: {
                    '/api': '/'
                }
            }
        }
    },
}
