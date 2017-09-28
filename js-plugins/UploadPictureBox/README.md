
# PreviewPicture

PreviewPicture插件用于本地图片预览. 预览时如下图所示：

<img src="https://raw.githubusercontent.com/ljxyweb/MarkDownPhotos/master/plugins/up.gif">


## Index

* [Usage](#usage)
* [Options](#options)
* [Compatibility](#compatibility)
* [License](#license)

## Usage

```html
<link rel="stylesheet" type="text/css" href="path/default.css">
<script src="path/previewpicture.js"></script>

<div class="inputbox clearfix">
  <label class="words">上传图片</label>
  <input type="file" name="" id="fileinput">
</div>
```

调用插件 
```js
var uploadfiles = document.querySelector('#fileinput');
var pp = new PreviewPicture({
    el: uploadfiles
});
```


## Options

可通过传递以下参数来自定义插件的调用。

| Option |  Type  |  Default | Description | 
|:------:|:------:|:--------:|-------------|
|   el   | object |    | el是用于图片上传的input框。该选项为必传项。 |
|   msg  | string | '点击添加图片' | 用于设置图片上传框的文字。        |  
                      

## Compatibility

该插件支持IE8及以上浏览器和其他现代浏览器。

## License

Licensed under the MIT License
