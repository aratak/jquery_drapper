(function($) {
  if($.fn.decorator === undefined) {
    throw "$.decorator plugin hasn't been required"
        + "This plugin depends from 'jquery.decorator' plugin. "
        + "See https://github.com/aratak/jquery.decorator/ for details."
  }

  $.decorators = (function() { return {
    slider: function() {
      if(!$.isFunction($.fn.slider)) {
        throw "decorator.slider work with jquery-ui slider. Please, require that"
      }

      var decoree = this;
      var elementFromParams = function(attributes, html, elementName) {
        elementName = elementName || 'span';
        html = (html === undefined) ? '' : html;
        return $(document.createElement(elementName)).attr(attributes).html(html);
      };
      var minLabel = elementFromParams({'data-decorator-minlabel': true}, $(decoree).attr('min'));
      var maxLabel = elementFromParams({'data-decorator-maxlabel': true}, $(decoree).attr('max'));
      var slider = elementFromParams({'data-decorator-slider': true});
      decoree.wrapper().append(maxLabel).append(minLabel).append(slider);

      $(slider).slider({
        min: $(decoree).attr('min'),
        max: $(decoree).attr('max'),
        step: (parseInt($(decoree).attr('step')) || 1),
        value: parseInt($(decoree).val()),
        slide: function(event, ui) {
          $(decoree).val( ui.value );
        }
      });
    }
  } })();
})(jQuery)