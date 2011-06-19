(function($) {
  $.decorators = {};

  $.fn.decorator = function(options) {
    options = $.extend({}, options);
    options.decoratorIdentifier = "data-decorator";
    options.elementSelector = options.elementSelector || '[' + options.decoratorIdentifier + ']';

    // options.attrType = options.attrType || 'data-decorator-type';
    // options.fakeDivStyleClass = "decoratorWrapper";
    // options.hideInputAttribute = "data-decorator-hide-input";

    var decoratorMethods = function(decoree){
      var _hashConfig = (function() {
        var _rawAttributeData = $(decoree).attr(options.decoratorIdentifier);
        var result = {};

        try {
          var _attributeData = eval( "({" + _rawAttributeData + "})" );
        } catch(e) {
          throw("Decorator attributes are invalid. It should be as 'decoratorName: config'. 'config' is a JSON. \n"
              + "Original error message: \n" + e.message );
        }

        $.each(_attributeData, function(key, value) {
          result['decoratorType'] = key;
          result['decoratorConfig'] = value;
        });
        return result;
      })()

      var type = function() { return _hashConfig.decoratorType };
      var config = function() { return _hashConfig.decoratorConfig };

      function wrapper() {
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
      };

      function decoratorConverter() {
        var converterPlugin = $.decorators[type()];

        if(converterPlugin === undefined) {
          throw "Undefined decorator extention '" + name + "'. "
              + "Please, provide 'jquery.decorator.'" + name + "' plugin. "
              + "See https://github.com/aratak/jquery.decorator/ for details."
        }

        return converterPlugin.call(decoree);
      };

      function init() {
        $.extend(decoree, {
          isDecoree: true,
          type: type(),
          config: config(),
          wrapper: wrapper,
        });
        return decoratorConverter();
      };

      return init();
    }

    return this.each(function() {
      $(this).find(options.elementSelector).each(function() {
        if(!$.isFunction(this.isDecoree)) {
          decoratorMethods(this);
        }
      });
    });
  }
})(jQuery);
