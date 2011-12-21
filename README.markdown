# jquery.drapper plugin #

 - when you need to write javascript, create a plugin. Do not write your own code in global namespace
 - your own js code should be unobtrusive

This plugin helps doing theese two steps.

## Installation ##

This plugin requires [jquery](http://jquery.com/).

Add `jquery.drapper.js` to the project. Mark DOM elements that you want to change with `data-decorate` attribute and initiate the plugin:

``` JavaScript
  $(document).ready(function() {
    $(this).drapper();
  })
```

## writing own drappers ##

Drappers should be added in `$.drappers` object. Use jQuery.extend for adding a new drapper. Here is an example:

``` javascript
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
    <script type="text/javascript" src="jquery.drapper.js"></script>
    <script type="text/javascript" src="jquery.drappers.myDrapper.js"></script>
    <script type="text/javascript">
      $('body').drapper();
    </script>
  </head>
  <body>

    <div data-drapper="myDrapper: {specialTactics: true}"></div>

  <body>
</html>
```

## LICENSE ##

Copyright (C) 2011 by Alexey Osipenko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

