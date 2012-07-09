#
# <div data-drapper="popup: {}">
#   <span data-drapper-popup="button">Click me</span>
#   <div data-drapper-popup="element">Popup</div>
# </div>
#
(($) ->
  throw "$.drapper plugin hasn't been required This plugin depends on 'jquery.drapper' plugin. See https://github.com/aratak/jquery_drapper/ for details." if $.fn.drapper is undefined

  class Popup
    constructor: (@button_selector, @element_selector, @cover)->
      @cover = $(@cover)
      @button = $(@cover).find @button_selector
      @element = $(@cover).find @element_selector
      @hide()
      @bindEvents()

    bindEvents: ->
      @button.click (e)=>
        @show()
        e.preventDefault()
        false

    show: ->
      @hideAnotherPopups()
      @element.show()
      @element.click (e)-> e.preventDefault()
      $('body').click => @hide()

    hideAnotherPopups: ->
      $(@element_selector).hide()

    hide: ->
      @element.hide()


  $.drappers['popup'] = ->
    throw "The object is not decoree! See https://github.com/aratak/jquery.drapper/ for details." unless @isDecoree
    @popup = new Popup('[data-drapper-popup=button]', '[data-drapper-popup=element]', @)

)(jQuery)
