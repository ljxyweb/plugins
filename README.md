# plugins
分为两种插件。一种基于jquery，在jquery-plugins文件夹中。一种基于原生js，在js-plugins文件夹中。

## 命令

```npm run build-min```

该命令对jquery-plugins和js-plugins文件夹下的js文件和css文件进行处理。对js进行压缩等处理，对css进行自动添加前缀和压缩等处理。处理完成后生成XX.min.js或XX.min.css文件。