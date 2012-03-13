(function ($) {
  if ($.fn.drapper === undefined) {
    throw "$.drapper plugin hasn't been required" +
          "This plugin depends on 'jquery.drapper' plugin. " +
          "See https://github.com/aratak/jquery.drapper/ for details.";
  }

  $.drappers['submitGroup'] = function () {
    var decoree = this;

    var name = $(decoree).attr('name');
    if (name === undefined || name.length === 0) {
      throw "drapper element submitGroup without 'name' attribute";
    }

    var Buttons = (function () {

      function Buttons(options, name) {
        this.buttons = $(options).map(function (index, option) {
          var button = $('<button></button>')[0];
          $(button).attr('name', name);
          $(button).val($(option).val());
          $(button).html($(option).html());
          return button;
        });
      }

      Buttons.prototype.toHTML = function () {
        return $(this.buttons);
      };

      return Buttons;
    }());

    var buttons = new Buttons(decoree.children, $(decoree).attr('name'));

    decoree.wrapper().append(buttons.toHTML());
    $(decoree).remove();
  };
}(jQuery));
