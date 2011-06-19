(function($) {
  if($.fn.decorator === undefined) {
    throw "$.decorator plugin hasn't been required"
        + "This plugin depends from 'jquery.decorator' plugin. "
        + "See https://github.com/aratak/jquery.decorator/ for details."
  }

  $.decorators = $.extend($.decorators, {
    slider: function() {
      if(!$.isFunction($.fn.slider)) {
        throw "decorator.slider work with jquery-ui slider. Please, require that"
      }

      if(!this.isDecoree) {
        throw "The object is not decoree!"
            + "See https://github.com/aratak/jquery.decorator/ for details."
      }


      var decoree = this;

      var hideBasicInput = function() {
        console.log(decoree)
        if(decoree.config.hideInputAttribute) {
          $(decoree).css({
            visibility: 'hidden',
            position: 'absolute',
            zIndex: '-1'
          });
          return true;
        } else {
          return false;
        }
      };
      var elementFromParams = function(attributes, html, elementName) {
        html = (html === undefined) ? '' : html;
        elementName = elementName || 'span';
        return $(document.createElement(elementName)).attr(attributes).html(html);
      };
      var getInt = function(val) {
        return isNaN(parseInt(val)) ? 0 : parseInt(val);
      };
      var setLabel = function() {
        return $(currentLabel).html( getInt($(decoree).val()) );
      };

      var minLabel = $(decoree).attr('min') ? elementFromParams({'data-decorator-minlabel': true}, $(decoree).attr('min')) : null;
      var maxLabel = $(decoree).attr('max') ? elementFromParams({'data-decorator-maxlabel': true}, $(decoree).attr('max')) : null;
      var currentLabel = elementFromParams({'data-decorator-currentlabel': true}, $(decoree).val());
      var slider = elementFromParams({'data-decorator-slider': true});
      decoree.wrapper().append(maxLabel).append(minLabel).append(slider).append(currentLabel);
      hideBasicInput()

      $(decoree).change(setLabel);

      $(slider).slider({
        min: getInt($(decoree).attr('min')),
        max: getInt($(decoree).attr('max')),
        step: (parseInt($(decoree).attr('step')) || 1),
        value: getInt($(decoree).val()),
        slide: function(event, ui) {
          $(decoree).val( ui.value );
          $(decoree).trigger("change");
        }
      });
    }
  });
})(jQuery)