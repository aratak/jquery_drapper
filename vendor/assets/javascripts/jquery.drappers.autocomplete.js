(function ($) {
  $.drappers = $.extend($.drappers, {
    autocomplete: function () {
      if ($.browser.msie && $.browser.version >= "8.0") {
        return false;
      }
           
      if (!$.isFunction($.fn.sortable)) {
        throw "Jquery plugin '$.fn.tokenInput' hasn't been required. " +
              "Check http://loopj.com/jquery-tokeninput/ ";
      }

      if (!this.isDecoree) {
        throw "The object is not decoree!" +
              "See https://github.com/aratak/jquery.drapper/ for details.";
      }

      var decoree = this;

      var getData = function (selectSelected) {
        return $(decoree).find('option' + (selectSelected ? '[selected]' : '')).map(function () {
          return {
            id: $(this).val(),
            queue: $(this).attr('data-drapper-keywords'),
            hint: $(this).attr('data-drapper-hint'),
            value: $(this).html()
          };
        });
      };

      var getOptionByItem = function (item) {
        return $(decoree).find('option[value=' + item['id'] + ']');
      };

      var optionsToTokenInput = function () {
        return $.extend({
          theme: 'facebook',
          propertyToSearch: "queue",
          resultsFormatter: function (item) { return "<li>" + item.hint + "</li>"; },
          tokenFormatter: function (item) { return "<li>" + item.value + "</li>"; },
          preventDuplicates: true,
          hintText: "Type in a search term",
          onAdd: function (item) {
            getOptionByItem(item).attr('selected', 'selected');
            $(decoree).trigger('change');
          },
          onDelete: function (item) {
            getOptionByItem(item).removeAttr('selected');
            $(decoree).trigger('change');
          },
          prePopulate: getData(true)
        }, decoree.config);
      };

      var tokenInput = function () {
        var findTokenInput = function () {
          decoree.wrapper().find('input[data-drapper-autocomplete-container]');
        };
        var createTokenInput = function () {
          return $(document.createElement('input')).attr({
            'type': 'text',
            'data-drapper-autocomplete-container': true
          }).appendTo(decoree.wrapper());
        };
        return findTokenInput() || createTokenInput();
      };

      var hideDecoree = function () {
        $(decoree).css({
          visibility: 'hidden',
          position: 'absolute',
          zIndex: -1
        });
        return true;
      };

      hideDecoree();
      $(tokenInput()).tokenInput(getData(), optionsToTokenInput());
    }
  });
}(jQuery));

