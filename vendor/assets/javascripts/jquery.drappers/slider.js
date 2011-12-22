(function($) {
  if($.fn.drapper === undefined) {
    throw "$.drapper plugin hasn't been required"
        + "This plugin depends from 'jquery.drapper' plugin. "
        + "See https://github.com/aratak/jquery.drapper/ for details."
  }

  $.drappers = $.extend($.drappers, {
    slider: function() {
      if(!$.isFunction($.fn.slider)) {
        throw "drapper.slider work with jquery-ui slider. Please, require that"
      }

      if(!this.isDecoree) {
        throw "The object is not decoree!"
            + "See https://github.com/aratak/jquery.drapper/ for details."
      }


      var decoree = this;

      var hideBasicInput = function() {
        if(decoree.config.hideInputAttribute) {
          $(decoree).css({
            'visibility': 'hidden',
            'position': 'absolute',
            'zIndex': '-1'
          });
          return true;
        } else {
          return false;
        }
      };
      var elementFromParams = function(attributes, html, elementName) {
        html = (html === undefined) ? '' : html;
        elementName = elementName || 'span';
        return $(document.createElement(elementName)).attr(attributes).html(html.replace(/(<([^>]+)>)/ig,""));
      };
      var getInt = function(val) {
        return isNaN(parseInt(val)) ? 0 : parseInt(val);
      };
      var setLabel = function() {
        return $(currentLabel).html( getInt($(decoree).val()) );
      };
      var minValue = getInt($(decoree).attr('min'));
      var maxValue = getInt($(decoree).attr('max'));
      var calculatePercent = function(val) {
        return ((val - minValue) / (maxValue - minValue)) * 100;
      };
      var sliderEvent = function(event, ui) {
        $(decoree).val( ui.value );
        $(decoree).trigger("change");
        $('[data-drapper-currentlabel]').css({
          'left': calculatePercent(ui.value) + "%"
        })
        return true;
      };

      var minLabel = $(decoree).attr('min') ? elementFromParams({'data-drapper-minlabel': true}, $(decoree).attr('min')) : null;
      var maxLabel = $(decoree).attr('max') ? elementFromParams({'data-drapper-maxlabel': true}, $(decoree).attr('max')) : null;
      var currentLabel = elementFromParams({'data-drapper-currentlabel': true}, $(decoree).val());
      var slider = elementFromParams({'data-drapper-slider': true});
      decoree.wrapper().append(maxLabel).append(minLabel).append(slider).append(currentLabel);
      hideBasicInput();

      $(decoree).change(setLabel);

      $(slider).slider({
        'min': getInt($(decoree).attr('min')),
        'max': getInt($(decoree).attr('max')),
        'step': (getInt($(decoree).attr('step')) || 1),
        'value': getInt($(decoree).val()),
        'disabled': decoree.config.disabled,
        'slide': sliderEvent,
      });
    }
  });
})(jQuery)
