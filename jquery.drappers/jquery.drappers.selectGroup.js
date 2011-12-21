(function($) {
  if($.fn.drapper === undefined) {
    throw "$.drapper plugin hasn't been required"
        + "This plugin depends from 'jquery.drapper' plugin. "
        + "See https://github.com/aratak/jquery.drapper/ for details."
  }

  $.drappers = $.extend($.drappers, {
    selectGroup: function() {
      var decoree = this;
      var decoreeType = $(decoree).attr('multiple') ? "checkbox" : "radio";
      var createListItem = function(optionTag, i) {
        var liTag = $(document.createElement("li"));
        optionTag = $(optionTag);

        var inputTag = $(document.createElement("input")).attr({
          type: decoreeType,
          name: $(decoree).attr('name'),
          id: $(decoree).attr('id') + "_" + i,
          value: optionTag.val(),
          checked: optionTag.is(':selected')
        });

        var labelTag = $(document.createElement("label")).attr({
          for: $(decoree).attr('id') + "_" + i
        }).html(optionTag.val().replace(/(<([^>]+)>)/ig,""));

        return liTag.append(inputTag).append(labelTag);
      };
      var hideBasicInput = function() {
        console.log(decoree)
        if(decoree.config.hideInputAttribute) {
          $(decoree).css({
            visibility: 'hidden',
            position: 'absolute',
            zIndex: '-1'
          });
        }
        return true;
      };

      var removeDecoree = function() {
        return $(decoree).remove();
      }

      var list = $(document.createElement("ul")).attr({
        'data-drapper-list': true
      }).addClass('drapperList drapperRadioGroup');


      $.each($(decoree).find('option'), function(i, optionTag) {
        list.append(createListItem(optionTag, i));
      });

      return decoree.wrapper().append(list) && hideBasicInput() && removeDecoree();
    }
  });
})(jQuery)
