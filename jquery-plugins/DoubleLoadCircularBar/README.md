# jquery-circularbar
It's a jquery plugin to to draw animated circular progress bars, support double loading. Like this

<img src="https://raw.githubusercontent.com/ljxyweb/MarkDownPhotos/master/plugins/cb.gif" width="200px">

## Index

* [Install](#install)
* [Usage](#usage)
* [Options](#options)
* [Compatibility](#compatibility)
* [License](#license)

Install
---------------
```
git clone git@github.com:ljxyweb/plugins.git
cd plugins/
npm install
```
Usage
----------------
I use [UMD template for jQuery plugin](https://github.com/umdjs/umd/blob/d31bb6ee7098715e019f52bdfe27b3e4bfd2b97e/templates/jqueryPlugin.js) which combines three things:
- works fine with browser globals
- works fine with AMD
- works fine with CommonJS
### Browser globals
```
<script src="/path/jquery.min.js"></script>
<script src="/path/jquery-circularbar.js"></script>

<div id="canvas1"></div>

<script>
  $('#canvas1').circularBar({
      value: [0.8,0.2]
  });
</script>
```
### AMD
```
<script src="/path/require.js"></script>
<script>
  requirejs.config({
    paths: {
      'jquery': '/path/jquery', // 'jquery' path is required 
      'jquery-circularbar': '/path/jquery-circularbar' 
    }
  });
  requirejs(['jquery', 'jquery-circularbar'], function($) {
    $('#canvas1').circularBar({
        value: [0.8, 0.2]
    });
  });
</script>
```
### CommonJS
```
var $=require('jquery-circularbar');
$('#canvas1').circularBar({
      value: [0.8,0.2]
});
```
Options
-------------------------
| Option  | Type | Default | Description |
| :-----: | :--: | :--:    | :---------- |
| value  | array \| number|[0.5, 0.5]|This is the only required option. Every value should be from 0.0 to 1.0 .When it's array,the first stands for the "left" arc's value, and the second stands for the "right" arc's value.|
| useSize |boolean| false|Whether to use size. True stands for supporting custom size.|
| size |number| 100.0|Size of the circle / canvas in pixels.|
|startAngle|number| -0.5 * Math.PI|Initial angle  in radians.|
| loadClockwise |boolean|true|load direction. If and only if it's one-way load,this parameter is useful.|
| arcWidth |number\|string|'auto'|Width of the arc. By default it's auto-calculated as 1/14 of size, but you may set it explicitly in pixels.|
| fillColor |array\|string| ['#3aeabb', '#fdd250']|Fill of the arc .FillColor's type should be the same as value's type.When it's array,the first stands for the "left" arc's color, and the second stands for the "right" arc's color.|
| emptyFill |string|'#eee'| Color of the "empty" arc. Only a color fill supported by now.|
| animation |object\|boolean| {duration: 1200, easing: 'circularBarEasing'}|Animation config . [See this](http://api.jquery.com/animate/)|
| lineCap |string|'butt'|Arc line cap: 'butt', 'round' or 'square'.|

Compatibility
------------------------
The library uses ```<canvas>``` which is supported by all modern browsers (including mobile browsers) and Internet Explorer 9+ ([Can I Use](https://caniuse.com/#search=canvas)).

License
-----------------------
Licensed under the MIT License