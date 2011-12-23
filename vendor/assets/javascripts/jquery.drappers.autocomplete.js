(function($) {
  $.drappers = $.extend($.drappers, {
    autocomplete: function() {
      if(!$.isFunction($.fn.sortable)) {
        throw "Jquery plugin '$.fn.tokenInput' hasn't been required. "
            + "Check http://loopj.com/jquery-tokeninput/ "
      }

      if(!this.isDecoree) {
        throw "The object is not decoree!"
            + "See https://github.com/aratak/jquery.drapper/ for details."
      }

      var decoree = this;

    }
  });
})(jQuery);

