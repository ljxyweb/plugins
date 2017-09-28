/**
* CircularBar - jQuery Plugin to to draw animated circular progress bars,support double loading
* License: MIT
*/
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
  // ease-in-out-cubic
  $.easing.circularBarEasing = function (x, t, b, c, d) {
    if ((t /= d / 2) < 1)
      return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  };
  /**
   * Define CircularBar constructor
   */
  function CircularBar(ele, opt) {
    this.defaults = {
      /**
       * This is the only required option. Every value should be from 0.0 to 1.0
       * When it's array,the first stands for the "left" arc's value, and the second stands for the "right" arc's value.
       * @type {array|number}
       * @default [0.5, 0.5]
       */
      value: [0.5, 0.5],

      /**
       * Whether to use size. True stands for supporting custom size.
       * @type {boolean}
       * @default false
       */
      useSize: false,

      /**
       * Size of the circle / canvas in pixels.
       * @type {number}
       * @default 100.0
       */
      size: 100.0,

      /**
       * Initial angle  in radians
       * @type {number}
       * @default -0.5 * Math.PI
       */
      startAngle: -0.5 * Math.PI,
      /**
       * load direction.If and only if it's one-way load,this parameter is useful.
       * @type {boolean}
       * @default true
       */
      loadClockwise: true,
      /**
       * Width of the arc. 
       * By default it's auto-calculated as 1/14 of size, but you may set it explicitly in pixels
       * @type {number|string}
       * @default 'auto'
       */
      arcWidth: 'auto',

      /**
       * Fill of the arc . FillColor's type should be the same as value's type.
       * When it's array,the first stands for the "left" arc's color, and the second stands for the "right" arc's color.  
       * @type {array|string} 
       * @default  ['#3aeabb', '#fdd250']
       */
      fillColor: ['#3aeabb', '#fdd250'],

      /**
       * Color of the "empty" arc. Only a color fill supported by now
       * @type {string}
       * @default '#eee'
       */
      emptyFill: '#eee',

      /**
       * Animation config 
       * @see http://api.jquery.com/animate/
       * @type {object|boolean}
       * @default {duration: 1200, easing: 'circularBarEasing'}
       */
      animation: {
        duration: 1200,
        easing: 'circularBarEasing'
      },
      /**
       * Arc line cap: `'butt'`, `'round'` or `'square'` -
       * [read more]{@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.lineCap}.
       * @type {string}
       * @default 'butt'
       */
      lineCap: 'butt'
    };
    /**
     * Container element. Should be passed into constructor config.
     * @protected
     * @type {jQuery}
     */
    this.$el = ele;
    /**
     * Canvas element. Automatically generated and prepended to the Container element
     * @protected
     * @type {HTMLCanvasElement}
     */
    this.canvas = null;
    /**
     * 2D-context of the canvas element
     * @protected
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = null;
    /**
     * Radius of the outer circle. Automatically calculated as `[this.size]{@link CircularBar#defaults.size} / 2`
     * @protected
     * @type {number}
     */
    this.radius = 0.0;

    this.options = $.extend({}, this.defaults, opt);
  }
  /**
   * Define CircularBar method
   */
  CircularBar.prototype = {
    init: function () {
      var opt = this.options;
      if (!opt.useSize) {
        opt.size = $(this.$el).height();
      }
      opt.arcWidth = this.getArcWidth();
      this.radius = opt.size / 2;
      // Determine  if it supports loading
      if ($.isNumeric(opt.value)) {
        if (opt.loadClockwise) {
          opt.value = [0, parseFloat(opt.value)];
          if (typeof (opt.fillColor) === 'string') {
            opt.fillColor = [opt.emptyFill, opt.fillColor];
          } else {
            console.log("Error:fillColor needs to be string")
          }
        }
        else {
          opt.value = [parseFloat(opt.value), 0];
          if (typeof (opt.fillColor) === 'string') {
            opt.fillColor = [opt.fillColor, opt.emptyFill];
          } else {
            console.log("Error:fillColor needs to be string")
          }
        }
      }
      if ($.isArray(opt.value) && opt.value.length > 1) {
        this.initWidget();
        this.draw();
      }
    },
    /**
     * Add canvas to [this.$el]{@link CircularBar#$el}
     * @protected
     */
    initWidget: function () {
      var canvas = this.canvas = this.canvas || $('<canvas>').prependTo(this.$el)[0];
      var s = this.options.size;
      canvas.width = s;
      canvas.height = s;
      this.ctx = canvas.getContext('2d');
      if (window.devicePixelRatio > 1) {
        var scaleBy = window.devicePixelRatio;
        canvas.style.width = canvas.style.height = s + 'px';
        canvas.width = canvas.height = s * scaleBy;
        this.ctx.scale(scaleBy, scaleBy);
      }
    },
    /**
     * Draw the circle.
     * @protected
     */
    draw: function () {
      if (this.options.animation)
        this.drawAnimated();
      else
        this.drawFrame(true);
    },
    /**
     * Draw a single animation frame.
     * @protected
     * @param {boolean} noanimation - 是否有动画
     * @param {number} v - 比例值
     */
    drawFrame: function (noanimation, v) {
      var opt = this.options,
        value = [opt.value[0], opt.value[1]];

      if (!noanimation) {
        value[0] = v * value[0];
        value[1] = v * value[1];
      }
      //erasing any previously drawn content on the whole canvas
      this.ctx.clearRect(0, 0, this.size, this.size);
      this.drawArc(value);
    },
    /**
     * Draw the arc (part of the circle).
     * @protected
     * @param {array} v  - 左右圆弧的值
     */
    drawArc: function (v) {

      var ctx = this.ctx,
        r = this.radius,
        opt = this.options,
        t = opt.arcWidth,
        a = opt.startAngle,
        vl = v[0],
        vr = v[1];

      //draw the whole arc width emptyFill
      ctx.beginPath();
      ctx.arc(r, r, r - t, 0, Math.PI * 2);
      ctx.lineWidth = t;
      ctx.strokeStyle = opt.emptyFill;
      ctx.stroke();

      //draw the left arc
      ctx.save();
      ctx.beginPath();
      ctx.arc(r, r, r - t, a, a - Math.PI * 2 * vl, true);
      ctx.lineCap = opt.lineCap;
      ctx.strokeStyle = opt.fillColor[0];
      ctx.stroke();
      ctx.restore();

      //draw the right arc
      ctx.beginPath();
      ctx.arc(r, r, r - t, a, a + Math.PI * 2 * vr);
      ctx.lineCap = opt.lineCap;
      ctx.strokeStyle = opt.fillColor[1];
      ctx.stroke();
    },

    /**
     * Animate the progress bar.
     * @protected
     */
    drawAnimated: function () {
      var _this = this,
        $el = _this.$el;

      $(_this.canvas)
        .stop(true, true)
        .css({
          animationProgress: 0
        })
        .animate({
          animationProgress: 1
        }, $.extend({}, _this.options.animation, {
          step: function (animationProgress) {
            _this.drawFrame(false, animationProgress);
          }
        }));
    },
    /**
     * calculate arc width
     * @protected
     * @returns {number}
     */
    getArcWidth: function () {
      return $.isNumeric(this.options.arcWidth) ? parseInt(this.options.arcWidth) : this.options.size / 14;
    }
  }
  /**
   * In the plug-in to use CircularBar object
   *
   */
  $.fn.circularBar = function (options) {

    return this.each(function () {
      //Create CircularBar instance
      var circularBar = new CircularBar($(this), options);
      circularBar.init();
    });
  }
});
