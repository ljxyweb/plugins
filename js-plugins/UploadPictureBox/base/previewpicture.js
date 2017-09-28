(function (window) {
  "use strict";

  function PreviewPicture(config) {
    this.img = null;
    this.origin_img = null; //用于获取图片原始大小
    this.uploadBox = null;
    this.options = {
      msg: '点击添加图片'
    };
    this.el = config.el;
    for (var key in config) {
      if (config.hasOwnProperty(key)) {
        this.options[key] = config[key];
      }
    }
    // 初始化组件
    this.initWidget();
    // 添加事件
    this.addEvents();
  }
  PreviewPicture.prototype = {
    initWidget: function () {
      var parent = this.el.parentNode;
      this.uploadBox = document.createElement('div');
      this.uploadBox.innerHTML = this.options.msg;
      var ctb = document.createElement('div');
      this.uploadBox.className = 'but-upload';
      ctb.className = 'uploadbox';
      ctb.appendChild(this.uploadBox);
      this.uploadBox.appendChild(this.el);
      parent.appendChild(ctb);

    },
    addEvents: function () {
      var _this = this;
      var changeoper = function () {
        var files = this.files;
        if (files) {
          for (var i = 0; i < files.length; i++) {
            _this.previewImage(files[i]);
          }
        }
        else {
          //IE10以下不支持files，使用滤镜  
          _this.previewImageUnderIE9();
        }
      }
      if (this.el.addEventListener) { //如果支持addEventListener
        this.el.addEventListener('change', changeoper, false);
      }
      else if (this.el.attachEvent) { //如果支持attachEvent
        this.el.attachEvent("onchange", changeoper);
      }
      else { //否则使用兼容的onchange绑定
        this.el["onchange"] = changeoper;
      }

    },
    previewImage: function (file) {
      var imageType = /image.*/;
      var _this = this;
      if (!file.type.match(imageType)) {
        alert("File Type must be an image");
        return;
      }
      if (!this.img) {
        this.img = document.createElement("img");
        this.img.className = 'but-img';
        this.uploadBox.insertBefore(this.img, this.el);
      }
      this.img.file = file;
      // Using FileReader to display the image content
      var reader = new FileReader();
      reader.onload = (function (aImg) {
        return function (e) {
          aImg.src = e.target.result;
          aImg.onload = function () {
            _this.autoSizePreview(this.naturalWidth, this.naturalHeight);
          }
        };
      })(this.img);
      reader.readAsDataURL(file);

    },
    previewImageUnderIE9: function () {
      //获取文件路径，解决在IE8下由于安全问题,在上传文件时屏蔽了真实路径，用C:\fakepath\代替的问题
      this.el.select();
      var imgSrc = document.selection.createRange().text;
      var ext = imgSrc.substring(imgSrc.lastIndexOf('.') + 1).toLowerCase();
      // gif在IE10以下浏览器暂时无法显示
      if (ext != 'png' && ext != 'jpg' && ext != 'jpeg' && ext != 'gif') {
        alert("File Type must be an image");
        return;
      }
      if (!this.img) {
        this.origin_img = document.createElement('img');
        this.uploadBox.insertBefore(this.origin_img, this.el);
        this.origin_img.style.cssText = "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);visibility:hidden;position:absolute;top:0;left:0;";
        this.img = document.createElement('img');
        this.img.className = 'but-img';
        this.uploadBox.insertBefore(this.img, this.el);
        this.img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
      }
      //图片异常的捕捉，防止用户修改后缀来伪造图片  
      try {
        this.img.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        this.origin_img.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        this.autoSizePreview(this.origin_img.offsetWidth, this.origin_img.offsetHeight);
      }
      catch (e) {
        alert("您上传的图片格式不正确，请重新选择!");
      }
      document.selection.empty();
    },
    //设置图片宽高以及偏移量
    autoSizePreview: function (originalWidth, originalHeight) {
      var zoomParam = this.clacImgZoomParam(this.el.offsetWidth, this.el.offsetHeight, originalWidth, originalHeight);
      this.img.style.width = zoomParam.width + 'px';
      this.img.style.height = zoomParam.height + 'px';
      this.img.style.marginTop = zoomParam.top + 'px';
      this.img.style.marginLeft = zoomParam.left + 'px';
    },
    //计算图片宽高以及偏移量
    clacImgZoomParam: function (maxWidth, maxHeight, width, height) {
      var param = {
        width: width,
        height: height,
        top: 0,
        left: 0
      },
        rateWidth, rateHeight;

      if (width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
          param.width = maxWidth;
          param.height = height / rateWidth;
        }
        else {
          param.width = width / rateHeight;
          param.height = maxHeight;
        }
      }

      param.left = (maxWidth - param.width) / 2;
      param.top = (maxHeight - param.height) / 2;

      return param;
    }
  }
  window.PreviewPicture = window.PreviewPicture || PreviewPicture;
})(window)
