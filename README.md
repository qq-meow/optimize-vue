# vue-cordova模版项目

## 项目初始化
```
npm install
```

### 运行调试
```
npm run serve
```

### Lint文件修复
```
npm run lint
```
### webpack优化

## 可以安装 webpack-bundle-analyzer 监测一下打包文件
```
npm install webpack-bundle-analyzer -S
```

## 移除 preload 与 prefetch

## 使用 terser-webpack-plugin 清除 console.log (cli-service@4 版本自带此插件，视情况而定)
```
npm install terser-webpack-plugin -S 
```

## 使用 compression-webpack-plugin 开启 gzip 压缩 webpack5 以下使用 @6版本
```
npm install compression-webpack-plugin -S 
```

## 配置使用 CDN 方式引入资源库

## 如果无条件使用cdn方式引入资源库则可以使用splitChunks进行分包

## 使用 image-webpack-loade 压缩图片
```
npm install image-webpack-loader -S 
```

## 使用 HappyPack 进行多线程打包，但是不维护了。也可以使用 thread-loader (cli-service@4 版本自带thread-loader，视情况而定)
```
npm install happypack -S 
npm install thread-loader -S

