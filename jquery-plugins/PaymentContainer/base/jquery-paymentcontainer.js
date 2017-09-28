/*
PaymentContainer - jQuery Plugin to imitate the alipay password input
License: MIT
*/
(function ($) {
  /**
   * Define PaymentContainer constructor
   */
  function PaymentContainer(ele, opt) {
    this.$element = ele;
    this.$digitpassword = null;
    this.$guangbiao = null;
    this.defaults = {
      'smallboxwidth': 35,
      'smallboxnum': 6
    };
    this.options = $.extend({}, this.defaults, opt);
  }
  /**
   * Define PaymentContainer method
   */
  PaymentContainer.prototype = {
    init: function () {
      this.initWidget();
      this.addEvents();
    },
    /**
     * Build PaymentContainer model
     */
    initWidget: function () {
      var num = this.options.smallboxnum;
      var htmlstr = '',
        w;
      for (var i = 0; i < num; i++) {
        htmlstr = htmlstr + '<i><b></b></i>';
      }
      this.$guangbiao = $('<span class="guangbiao" style="left:-1px;visibility: hidden;"></span>');
      this.$element.addClass('i-text');
      this.$element.wrap('<div class="paymentcontainer"></div>');
      this.$element.after('<div class="digitpassword"></div>');
      this.$digitpassword = this.$element.parent('.paymentcontainer').find('.digitpassword');
      this.$digitpassword.append(htmlstr);
      this.$digitpassword.append(this.$guangbiao);
      this.$digitpassword.find('i').width(this.options.smallboxwidth);
      w = this.$digitpassword.outerWidth();
      this.$element.parent('.paymentcontainer').width(w);
      this.$element.width(w);
      this.$guangbiao.width(this.options.smallboxwidth);
    },
    /**
     * Add events to element
     */
    addEvents: function () {
      var width = this.options.smallboxwidth + 1;
      var num = this.options.smallboxnum;
      var $gb = this.$guangbiao;
      var $dpsd = this.$digitpassword;
      this.$element.on('focus', function () {
        var inp_v = $(this).val();
        var inp_l = inp_v.length;
        $gb.css({
          'visibility': 'visible',
          'left': inp_l * width - 1
        });
        $dpsd.find('i').eq(inp_l).addClass('active').siblings('i').removeClass('active');
      });
      this.$element.on('blur', function () {
        $gb.css({
          'visibility': 'hidden'
        });
        $dpsd.find('i').removeClass('active');
      });
      this.$element.on('keyup', function () {
        var inp_v = $(this).val();
        var inp_l = inp_v.length;
        var iList = $dpsd.find('i');
        if (inp_l == 0) {
          $dpsd.find('b').css({
            'display': 'none'
          });
          iList.eq(0).addClass('active').siblings('i').removeClass('active');
          $gb.css({
            'left': -1
          });
        }
        else if (inp_l >= num) {
          $dpsd.find('b').css({
            'display': 'block'
          });
          iList.removeClass('active');
          $gb.css({
            'visibility': 'hidden'
          });
          return;
        }
        iList.eq(inp_l).addClass('active').siblings('i').removeClass('active');
        iList.eq(inp_l).prevAll('i').find('b').css({
          'display': 'block'
        });
        iList.eq(inp_l - 1).nextAll('i').find('b').css({
          'display': 'none'
        });
        $gb.css({
          'left': inp_l * width - 1,
          'visibility': 'visible'
        });
      })
    }
  }
  /**
   * In the plug-in to use PaymentContainer object
   * @param options Example:  {'smallboxwidth': 35,'smallboxnum': 6};
   *
   */
  $.fn.paymentContainer = function (options) {

    return this.each(function () {
      //Create PaymentContainer instance
      //Initialize to clear the input value
      $(this).val('');
      var paymentContainer = new PaymentContainer($(this), options);
      paymentContainer.init();
    });
  }
})(jQuery);
