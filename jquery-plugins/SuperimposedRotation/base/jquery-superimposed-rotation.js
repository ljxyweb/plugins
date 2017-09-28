// 叠加轮播
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD - register as an anonymous module
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    var $ = require('jquery');
    factory($);
    module.exports = $;
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  //定义SuperimposedRotation的构造函数
  function SuperimposedRotation(ele, opt) {
    this.$element = ele;
    this.$list = ele.find("ul");
    this.$prevarrow = ele.find(".prev");
    this.$nextarrow = ele.find(".next");
    this.timer = null;
    this.defaults = {
      "index": 4, //以第index张图片为显示中心
      "speed": 1000, //点击显示前一张后一张时的速度
      "interval": 3000, //自动滚动的速度
      "autoplay": true //是否自动滚动
    };
    this.options = $.extend({}, this.defaults, opt);
  }
  SuperimposedRotation.prototype = {
    init: function () {
      this.addClickEvent();
      if (this.options.autoplay) {
        this.autoplay();
      }
    },
    addClickEvent: function () {
      var _this = this;
      if (this.$list.find("li").length > 7) {
        // 给前后箭头添加事件
        this.$prevarrow.click(function () {
          _this.prev();
        });
        this.$nextarrow.click(function () {
          _this.next();
        });

        if (this.options.autoplay) {
          //使用mouseover会导致子元素多次触发该事件，因此改用mouseenter
          this.$element.on("mouseenter", function () { //判断鼠标是否在容器上面
            _this.stop();
          });

          this.$element.on("mouseleave", function () {
            _this.autoplay();
          });
        }
      }

    },
    animate: function (dir) {
      var l = this.$list.find("li").length,
        t = this.options.speed,
        i = this.options.index,
        left7 = (i + 3 > l) ? i + 3 - l : i + 3,
        left6 = (i + 2 > l) ? i + 2 - l : i + 2,
        left5 = (i + 1 > l) ? i + 1 - l : i + 1,
        left4 = i,
        left3 = (i - 1 < 1) ? l + i - 1 : i - 1,
        left2 = (i - 2 < 1) ? l + i - 2 : i - 2,
        left1 = (i - 3 < 1) ? l + i - 3 : i - 3,
        hiddenSlideIndex;

      if (dir == "left") {
        this.$list.find("li:nth-child(" + left1 + ")").css({
          left: -195
        });
        hiddenSlideIndex = (i + 4 > l) ? i + 4 - l : i + 4;
        this.$list.find("li:nth-child(" + hiddenSlideIndex + ")").css({
          zIndex: 0
        });

        this.$list.find("li:nth-child(" + hiddenSlideIndex + ")").animate({
          opacity: 0,
          left: '1100px',
          height: '120px',
          width: '195px',
          top: '140px'
        }, t);
      } else {
        this.$list.find("li:nth-child(" + left7 + ")").css({
          left: 1100,
        });
        hiddenSlideIndex = (i - 4 < 1) ? l + i - 4 : i - 4;
        this.$list.find("li:nth-child(" + hiddenSlideIndex + ")").css({
          zIndex: 0
        });
        this.$list.find("li:nth-child(" + hiddenSlideIndex + ")").animate({
          opacity: 0,
          left: '-195px',
          height: '120px',
          width: '195px',
          top: '140px'
        }, t);
      }

      this.$list.find("li:nth-child(" + left7 + ")").css({
        zIndex: 1
      });
      this.$list.find("li:nth-child(" + left6 + ")").css({
        zIndex: 2
      });
      this.$list.find("li:nth-child(" + left5 + ")").css({
        zIndex: 3
      });
      this.$list.find("li:nth-child(" + left4 + ")").css({
        zIndex: 4
      });
      this.$list.find("li:nth-child(" + left3 + ")").css({
        zIndex: 3
      });
      this.$list.find("li:nth-child(" + left2 + ")").css({
        zIndex: 2
      });
      this.$list.find("li:nth-child(" + left1 + ")").css({
        zIndex: 1
      });

      this.$list.find("li:nth-child(" + left7 + ")").animate({
        opacity: 1,
        left: '905px',
        height: '120px',
        width: '195px',
        top: '140px'
      }, t);
      this.$list.find("li:nth-child(" + left6 + ")").animate({
        opacity: 1,
        left: '700px',
        height: '200px',
        width: '325px',
        top: '100px'
      }, t);
      this.$list.find("li:nth-child(" + left5 + ")").animate({
        opacity: 1,
        left: '462.5px',
        height: '300px',
        width: '487.5px',
        top: '50px'
      }, t);
      this.$list.find("li:nth-child(" + left4 + ")").animate({
        opacity: 1,
        left: '225px',
        height: '400px',
        width: '650px',
        top: '0px'
      }, t);
      this.$list.find("li:nth-child(" + left3 + ")").animate({
        opacity: 1,
        left: '150px',
        height: '300px',
        width: '487.5px',
        top: '50px'
      }, t);
      this.$list.find("li:nth-child(" + left2 + ")").animate({
        opacity: 1,
        left: '75px',
        height: '200px',
        width: '325px',
        top: '100px'
      }, t);
      this.$list.find("li:nth-child(" + left1 + ")").animate({
        opacity: 1,
        right: "auto",
        left: '0px',
        height: '120px',
        width: '195px',
        top: '140px'
      }, t);

    },
    prev: function () {
      if (this.$list.find("li").is(":animated")) {
        return;
      }
      if (this.options.index == 1) { //向左点击 index索引-1
        this.options.index = this.$list.find("li").length;
      } else {
        this.options.index -= 1;
      }
      this.animate("left");
    },
    next: function () {
      if (this.$list.find("li").is(":animated")) {
        return;
      }
      if (this.options.index == this.$list.find("li").length) { //向右点击 index索引+1
        this.options.index = 1;
      } else {
        this.options.index += 1;
      }
      this.animate("right");
    },
    autoplay: function () { //自动播放
      var _this = this;
      this.timer = setTimeout(function () {
        _this.$nextarrow.trigger("click");
        _this.autoplay();
      }, _this.options.interval);
    },
    stop: function () {
      clearInterval(this.timer);
    }
  }
  //在插件中使用SuperimposedRotation对象
  $.fn.SuperimposedRotation = function (options) {

    return this.each(function () {
      //创建SuperimposedRotation的实体
      var sr = new SuperimposedRotation($(this), options);
      sr.init();
    });
  }
});