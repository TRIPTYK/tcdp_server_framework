 /**
  * Protect window.console method calls, e.g. console is not defined on IE
  * unless dev tools are open, and IE doesn't define console.debug
  */
 (function() {
     if (!window.console) {
         window.console = {};
     }
     // union of Chrome, FF, IE, and Safari console methods
     var m = ["log", "info", "warn", "error", "debug", "trace", "dir", "group", "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd", "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"];
     // define undefined methods as noops to prevent errors
     for (var i = 0; i < m.length; i++) {
         if (!window.console[m[i]]) {
             window.console[m[i]] = function() {};
         }
     }
     if (!Array.prototype.indexOf) {
         Array.prototype.indexOf = function(searchElement /*, fromIndex */ ) {
             "use strict";
             if (this == null) {
                 throw new TypeError();
             }
             var t = Object(this);
             var len = t.length >>> 0;
             if (len === 0) {
                 return -1;
             }
             var n = 0;
             if (arguments.length > 0) {
                 n = Number(arguments[1]);
                 if (n != n) { // shortcut for verifying if it's NaN
                     n = 0;
                 } else if (n != 0 && n != Infinity && n != -Infinity) {
                     n = (n > 0 || -1) * Math.floor(Math.abs(n));
                 }
             }
             if (n >= len) {
                 return -1;
             }
             var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
             for (; k < len; k++) {
                 if (k in t && t[k] === searchElement) {
                     return k;
                 }
             }
             return -1;
         }
     }
 })();

 (function($) {
  // @todo Document this.
  $.extend($,{ placeholder: {
      browser_supported: function() {
        return this._supported !== undefined ?
          this._supported :
          ( this._supported = !!('placeholder' in $('<input type="text">')[0]) );
      },
      shim: function(opts) {
        var config = {
          color: '#888',
          cls: 'placeholder',
          selector: 'input[placeholder], textarea[placeholder]'
        };
        $.extend(config,opts);
        return !this.browser_supported() && $(config.selector)._placeholder_shim(config);
      }
  }});

  $.extend($.fn,{
    _placeholder_shim: function(config) {
      function calcPositionCss(target)
      {
        var op = $(target).offsetParent().offset();
        var ot = $(target).offset();

        return {
          top: ot.top - op.top,
          left: ot.left - op.left,
          width: $(target).width()
        };
      }
      function adjustToResizing(label) {
        var $target = label.data('target');
        if(typeof $target !== "undefined") {
          label.css(calcPositionCss($target));
          $(window).one("resize", function () { adjustToResizing(label); });
        }
      }
      return this.each(function() {
        var $this = $(this);

        if( $this.is(':visible') ) {

          if( $this.data('placeholder') ) {
            var $ol = $this.data('placeholder');
            $ol.css(calcPositionCss($this));
            return true;
          }

          var possible_line_height = {};
          if( !$this.is('textarea') && $this.css('height') != 'auto') {
            possible_line_height = { lineHeight: $this.css('height'), whiteSpace: 'nowrap' };
          }

          var isBorderBox = ($this.css('box-sizing') === 'border-box');
          var isTextarea = $this.is('textarea');

          var ol = $('<label />')
            .text($this.attr('placeholder'))
            .addClass(config.cls)
            .css($.extend({
              position:'absolute',
              display: 'inline',
              'float':'none',
              overflow:'hidden',
              textAlign: 'left',
              color: config.color,
              cursor: 'text',
              paddingTop: !isTextarea && isBorderBox ? '0' : $this.css('padding-top'),
              paddingRight: $this.css('padding-right'),
              paddingBottom: !isTextarea && isBorderBox ? '0' : $this.css('padding-bottom'),
              paddingLeft: $this.css('padding-left'),
              fontSize: $this.css('font-size'),
              fontFamily: $this.css('font-family'),
              fontStyle: $this.css('font-style'),
              fontWeight: $this.css('font-weight'),
              textTransform: $this.css('text-transform'),
              backgroundColor: 'transparent',
              zIndex: 99
            }, possible_line_height))
            .css(calcPositionCss(this))
            .attr('for', this.id)
            .data('target',$this)
            .click(function(){
                if (!$(this).data('target').is(':disabled')) {
                    $(this).data('target').focus();
                }
            })
            .insertBefore(this);
          $this
            .data('placeholder',ol)
                        .keydown(function(){
                            ol.hide();
                        })
                        .blur(function() {
              ol[$this.val().length ? 'hide' : 'show']();
            }).triggerHandler('blur');
          $(window).one("resize", function () { adjustToResizing(ol); });
        }
      });
    }
  });
})(jQuery);

jQuery(document).add(window).bind('ready load', function() {
  if (jQuery.placeholder) {
    jQuery.placeholder.shim();
  }
});
