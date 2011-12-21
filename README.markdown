# jquery_drapper plugin #

 - when you need to write javascript, create a plugin. Do not write your own code in global namespace
 - your own js code should be unobtrusive

This plugin helps doing theese two steps.

## Installation ##

This plugin requires [jquery](http://jquery.com/).

Add `jquery_drapper.js` to the project. Mark DOM elements that you want to change with `data-decorate` attribute and initiate the plugin:

``` JavaScript
  $(document).ready(function() {
    $(this).drapper();
  })
```

## writing own drappers ##

Drappers should be added in `$.drappers` object. Use jQuery.extend for adding a new drapper. Here is an example:

``` JavaScript
$.drappers = $.extend($.drappers, {
  mydrapper: function() {
    console.log("The special code, writing for html elements with drapper type 'myDrapper'");

    if(this.config.specialTactics) {
      $(this).css({
        border: '1px solid black'
      });
    }
    $(this).click(function{} (
      $(this).hide();
    ));
  }
})
```

After requiring that, you will be able to write the following:

``` html
<html>
  <head>
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="jquery_drapper.js"></script>
    <script type="text/javascript" src="jquery_drappers.myDrapper.js"></script>
    <script type="text/javascript">
      $('body').drapper();
    </script>
  </head>
  <body>

    <div data-drapper="myDrapper: {specialTactics: true}"></div>

  <body>
</html>
```
## Copyright

Copyright (C) 2011 by Alexey Osipenko. License see in file MIT-LICENSE
