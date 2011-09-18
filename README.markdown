# jquery.decorator plugin #

 - when you need to write javascript, create a plugin. Do not write your own code in global namespace
 - your own js code should be unobtrusive

This plugin helps doing theese two steps.

## Installation ##

This plugin requires [jquery](http://jquery.com/). 

Add ```jquery.decorator.js``` to the project. This plugin define the elements, which you will change. Mark this elements with ```data-decorate``` attribute and initiate the plugin: 

``` JavaScript
  $(document).ready(function() {
    $(this).decorator();
  })
```

## writing own decorators ##

Decorators should be added in ```$.decorators``` object. Use jQuery.extend for adding a new decorator. Here is an example:

``` JavaScript
$.decorators = $.extend($.decorators, {
  myDecorator: function() {
    console.log("The special code, writing for html elements with decorator type 'myDecorator'");
    
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
    <script type="text/javascript" src="jquery.decorator.js"></script>
    <script type="text/javascript" src="jquery.decorators.myDecorator.js"></script>
    <script type="text/javascript">
      $('body').decorator();
    </script>
  </head>
  <body>
    
    <div data-decorator="myDecorator: {specialTactic: true}"></div>
    
  <body>
</html>
```



