
# SuperimposedRotation

SuperimposedRotation插件可进行叠加轮播，至少准备7张图片进行轮播，所提供的图片宽高比需为1.625，图片宽最好大于等于600px。 运行时大体如下图所示：

<img src="https://raw.githubusercontent.com/ljxyweb/MarkDownPhotos/master/plugins/sr.gif">

## Index

* [Usage](#usage)
* [Options](#options)
* [Compatibility](#compatibility)
* [License](#license)

## Usage
----------------
该插件使用了 [jQuery插件的UMD模板](https://github.com/umdjs/umd/blob/d31bb6ee7098715e019f52bdfe27b3e4bfd2b97e/templates/jqueryPlugin.js)，可通过以下三种方式使用:
- Browser globals方式使用
- AMD方式使用
- CommonJS方式使用

Dom结构类似如下
```html
<div class="overlaybox w1200">
    <ul class="overlay-slide-item">
      <li class="left1"><img src="./img/overlayimg1.jpg"></li>
      <li class="left2"><img src="./img/overlayimg2.jpg"></li>
      <li class="left3"><img src="./img/overlayimg3.jpg"></li>
      <li class="left4"><img src="./img/overlayimg4.jpg"></li>
      <li class="left5"><img src="./img/overlayimg5.jpg"></li>
      <li class="left6"><img src="./img/overlayimg6.jpg"></li>
      <li class="left7"><img src="./img/overlayimg7.jpg"></li>
      <li class="hiddenslide"><img src="./img/overlayimg8.jpg"></li>
      <li class="hiddenslide"><img src="./img/overlayimg9.jpg"></li>
      <li class="hiddenslide"><img src="./img/overlayimg10.jpg"></li>
    </ul>
    <a class="overlay-arrow prev"></a>
    <a class="overlay-arrow next"></a>
</div>
```

### Browser globals
```
<link rel="stylesheet" type="text/css" href="path/default.css">
<script src="/path/jquery.min.js"></script>
<script src="/path/jquery-superimposed-rotation.js"></script>

<script>
  $(".overlaybox").SuperimposedRotation();
</script>
```
### AMD
```
<link rel="stylesheet" type="text/css" href="path/default.css">

<script src="/path/require.js"></script>
<script>
  requirejs.config({
    paths: {
      'jquery': '/path/jquery', // 'jquery' path is required 
      'jquery-superimposed-rotation': '/path/jquery-superimposed-rotation' 
    }
  });
  requirejs(['jquery', 'jquery-superimposed-rotation'], function($) {
    $(".overlaybox").SuperimposedRotation();
  });
</script>
```
### CommonJS
```
var $=require('jquery-superimposed-rotation');
$(".overlaybox").SuperimposedRotation();
```

## Options

可通过传递以下参数来自定义插件的调用。

|  Option  |   Type  | Default | Description        |
|:--------:|:-------:|:-------:|--------------------|
|   index  |  number |    4    | 以第index张图片为显示中心。   |
|   speed  |  number |   1000  | 点击显示前一张后一张时的速度。    |
| interval |  number |   3000  | 自动滚动的速度。           |
| autoplay | boolean |   true  | 是否自动滚动。true表示自动滚动。 |
                      

## Compatibility

* 该插件支持IE9及以上浏览器和其他现代浏览器。

## License

Licensed under the MIT License
