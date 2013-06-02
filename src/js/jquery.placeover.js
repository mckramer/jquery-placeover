/**
 * Placeover plugin for jQuery
 * 
 * Heavily borrowed from MooTools More - OverText
 * 
 * @author Max Kramer (@maxckramer)
 * @version 0.0.1
 */
/*jshint laxcomma:true */
/*global jQuery:false */
;(function (window, document, $, undefined) {
  
  "use strict";
  
  var ignoreKeys              = [8, 16, 17, 18, 20, 37, 38, 39, 40, 91, 224]
    , ignoreSupported         = $.fn.placeoverSetup && $.fn.placeoverSetup.ignoreSupported
    , isInputSupported        = 'placeholder' in document.createElement('input')
    , isTextareaSupported     = 'placeholder' in document.createElement('textarea')
    , isPlaceholderSupported  = isInputSupported && !ignoreSupported
    , defaults = {
        event: 'type',
        eventNamespace: '.placeover',
        explicit: false,
        hideClass: 'hide',
        overClass: 'input-placeover'
      }
    , hooks = {
        set: function (element, value) {
          element.value = value;
          $(element).placeover('toggle');
        }
      }
  ;
  
  // Don't overwrite set hook willy-nilly, merge
  /*function createHooks(hooks) {
    var set;
    if (hooks) {
      set = typeof hooks.set === 'function' ? hooks.set : function (element, value) { element.value = value };
    } else {
      hooks = {};
    }
    hooks.set = function (element, value) {
      set(element, value);
      $(element).placeover('toggle');
    };
    return hooks;
  }*/
  
  /**
   * 
   *
   * @param el [element]
   */
  function getCursorPosition(el) {
    if ("selection" in document) {
      var range = el.createTextRange();
      try {
        range.setEndPoint("EndToStart", document.selection.createRange());
      } catch (e) {
        // Catch IE failure here, return 0 like other browsers
        return 0;
      }
      return range.text.length;
    } else if (el.selectionStart != null) {
      return el.selectionStart;
    }
  }
  
  /**
   * 
   *
   * @constructor
   * @param input [element]
   * @param options [object]
   */
  function Placeover(input, options) {
    
    this.input = input;
    this.$input = $(input);
    this.options = $.extend(defaults, options);
    
    /*if (this.options.event === 'focus') {
      this.options.event = {
        hide: 'focus',
        show: 'blur'
      };
    } else if (this.options.event === 'type') {
      this.options.event = {
        hide: 'keydown',
        show: 'keyup',
      };
    }*/
    
    if (isPlaceholderSupported) {
      this.$text = $();
    } else {
      this.attach();
      if (!this.options.explicit) this.enable();
    }
   
  }
  
  $.extend(Placeover.prototype, {
    
    /**
     * 
     */
    attach: function () {
      
      // Setup placeover text
      this.$text = $('<span unselectable="on" />');
      this.$text
        .addClass(this.options.overClass)
        .css('height', this.$input.height())
        .css('width', this.$input.width())
        .text(this.$input.attr('placeholder'));
      this.$input.removeAttr('placeholder');
      
      // Position and add text to DOM
      this.reposition();
      this.$text.insertAfter(this.$input);
      
      // Show or hide text
      this.toggle();
    },
    
    /**
     * Enable events.
     */
    enable: function () {
      this.$input
        .on('keydown.placeover', $.proxy( function (e) {
            if ($.inArray(e.which, ignoreKeys) === -1) { 
              this.hide(e);
            } /*else if (e.which === 8 && this.$input.val().length === 1 && getCursorPosition(this.input) == 1) { 
              this.show(e); 
            }*/
          }, this))
        .on('keyup.placeover blur.placeover', $.proxy( function (event) {
            this.toggle(event);
          }, this));
      this.$text
        .on('click.placeover', $.proxy( function () { this.$input.focus(); }, this));
    },
    
    /**
     * Destroy.
     */
    destroy: function () {
      this.$text.remove();
      if (!isPlaceholderSupported) this.$input.attr('placeholder', this.text());
      this.$input.removeData('placeover');
    },
    
    /**
     * Disable events.
     */
    disable: function () {
      this.$input.off('keydown.placeover keyup.placeover blur.placeover');
      this.$text.off('click.placeover');
    },
    
    /**
     * Hide.
     * @param event [jQuery event] the event
     */
    hide: function (event) {
      var hide = $.Event('hide' + this.options.eventNamespace);
      
      // Check if hide is prevented
      this.$input.trigger(hide);
      if (hide.isDefaultPrevented()) return;
      
      // Hide the placeover text
      if (this.options.hideClass) {
        this.$text.addClass(this.options.hideClass);
      } else {
        this.$text.hide();
      }
      
      // Trigger hidden
      this.$input.trigger('hidden' + this.options.eventNamespace);
    },
    
    /**
     * Get the position of the placeover text.
     * @return [object] the position
     */
    position: function () {
      var position = this.$input.position();
      position.left += parseInt(this.$input.css('paddingLeft'), 10) +
                       parseInt(this.$input.css('borderLeftWidth'), 10);
      position.top  += parseInt(this.$input.css('paddingTop'), 10) +
                       parseInt(this.$input.css('borderTopWidth'), 10);
      return position;
    },
    
    /**
     * Re-position the text.
     */
    reposition: function () {
      var position = this.position();
      this.$text
        .css('top',  position.top)
        .css('left', position.left);
    },
    
    show: function (event) {
      var show = $.Event('show' + this.options.eventNamespace);
      
      // Allow show to be prevented
      this.$input.trigger(show);
      if (show.isDefaultPrevented()) return;
      
      // Show the placeover text
      if (this.options.hideClass) {
        this.$text.removeClass(this.options.hideClass);
      } else {
        this.$text.show(); 
      }
      
      // Trigger shown
      this.$input.trigger('shown' + this.options.eventNamespace);
    },
    
    /**
     *
     * @return [string] the current text
     */
    text: function (text) {
      if (typeof text === 'undefined') {
        return this.$input.attr('placeholder') || this.$text.text();
      } else {
        if (isPlaceholderSupported) this.$input.attr('placeholder', text);
        this.$text.text(text);
      }
    },
    
    /**
     * Toggle.
     * @param event [jQuery.Event]
     */
    toggle: function (event) {
      this[this.$input.val() ? 'hide' : 'show'](event);
    }
    
  });
  
  // Setup plugin
  $.fn.placeover = function (option, arg) {
    var result;
    this.each( function () {
      var $this = $(this)
      , data = $this.data('placeover');
      if (!data) $this.data('placeover', (data = new Placeover(this, option)));
      if (typeof option === 'string') {
        result = data[option](arg);
        if (result) return false;
      }
    });
    return result || this;
  };
  
  // Setup valHooks
  if (!isPlaceholderSupported) {
    $.valHooks.input = $.extend({}, $.valHooks.input, hooks);
  }
  if (!isPlaceholderSupported) {
    $.valHooks.textarea = $.extend({}, $.valHooks.textarea, hooks);
  }
  
})(window, document, jQuery);