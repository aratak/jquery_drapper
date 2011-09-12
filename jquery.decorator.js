(function($) {
  $.decorators = {};

  $.fn.decorator = function(options) {
    options = $.extend({}, options);
    options.elementSelector = options.elementSelector || '[data-decorate]';
    options.attrType = options.attrType || 'data-decorator-type';
    options.fakeDivStyleClass = "decoratorWrapper";
    options.hideInputAttribute = "data-decorator-hide-input";

    var decoratorMethods = {
      wrapper: function() {
        var decoree = this;
        var findFakeDiv = function() {
          var a = $(decoree).next('div[data-decorator-wrapper]');
          if(a.length == 0) {
            return false;
          } else {
            return a;
          }
        };
        var createFakeDiv = function() {
          var fakeDiv = $(document.createElement('div'));
          fakeDiv.attr({ 
            'data-decorator-wrapper': true, 
            'class': 'decoratorWrapper'
          });
          $(decoree).after(fakeDiv);
          return fakeDiv;
        };
        return findFakeDiv() || createFakeDiv();
      },
      hideBasicInput: function() {
        if($(this).attr(options.hideInputAttribute)) {
          $(this).css({
            visibility: 'hidden',
            position: 'absolute',
            zIndex: '-1'
          });
          return true;
        } else {
          return false;
        }
      },
      decorate: function() {
        var decoree = this;
        var decoratorConverterName = $(this).attr(options.attrType);
        var decoratorConverter = $.decorators[decoratorConverterName];

        if(decoratorConverter === undefined) {
          throw "Undefined decorator extention '" + decoratorConverterName + "'. "
              + "Please, provide 'jquery.decorator.'" + decoratorConverterName + "' plugin. "
              + "See https://github.com/aratak/jquery.decorator/ for details."
        }

        this.hideBasicInput();
        return decoratorConverter.call(decoree);
      }
    }

    return this.each(function() {
      $(this).find(options.elementSelector).each(function() {
        if(!$.isFunction(this.decorate)) {
          $.extend(this, decoratorMethods);
          this.decorate();
        }
      });
    });
  }
})(jQuery);