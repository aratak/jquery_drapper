(function($) {
  $.drappers = $.extend($.drappers, {
    sortable: function() {
      if(!$.isFunction($.fn.sortable)) {
        throw "Jquery plugin '$.fn.sortable' hasn't been required. "
            + "This is part of jquery-ui framework.s "
      }

      if(!this.isDecoree) {
        throw "The object is not decoree!"
            + "See https://github.com/aratak/jquery.drapper/ for details."
      }

      var decoree = this;


      var postDecoreeForm = function() {
        $(decoree).find('input[type=submit]').trigger('click');
      };

      var updateDecoreeInputs = function(event, ui) {
        $.each($(decoree.config.sortableList).find(sortableOptions.items), function(index, item) {
         var positionInputId = $(item).attr('data-for');
          var positionInput = $(decoree).find("#" + positionInputId);
          positionInput.val(index+1);
        });
        postDecoreeForm();
      };

      var sortableOptions = $.extend({
        placeholder: "ui-state-highlight",
        update: updateDecoreeInputs,
        hideDecoree: true,
        animate: true,
        cursor: '-moz-grabbing'
      }, decoree.config.sortableOptions);

      var hideDecoree = function() {
        if(sortableOptions.hideDecoree) {
          $(decoree).css({
            visibility: 'hidden',
            position: 'absolute',
            zIndex: -1
          })
        }
        return true;
      };

      hideDecoree();
      console.log(decoree.config.sortableList)
      console.log(sortableOptions)
      $(decoree.config.sortableList).sortable(sortableOptions);
    }
  });
})(jQuery);
