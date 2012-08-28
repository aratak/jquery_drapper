class Drapper
  constructor: (@el, @options)->
    extractConfig()
    defaultOptions()
    decoree()

  decoree: ->
    _.extend @el,
      isDecoree: true,
      drapperType: _type(),
      config: config(),
      wrapper: wrapper

  extractConfig: ->

  defaultOptions: ->
    @options = _.extend @options,
      attributeContainer: "data-drapper"

  name: ->
    @attributeData('name')
  config: ->
    @attributeData('config')


  attributeData: (dataName)->
    if @_attributeData?
      return if dataName? then @_attributeData[dataName] else @_attributeData

    try
      eval("this._attributeData = {#{@_rawAttributeData()}}", @)
    catch e
      throw ("Drapper attributes are invalid. It should be as 'drapperName: config'. 'config' is a JSON. \n" +
             "Original error message: \n" + e.message);

    result = {}
    _.each @_attributeData, (value, key) ->
      result['name'] = key
      result['config'] = value

    @attributeData(dataName)




  # "slider: { hideInputAttribute: true }
  _rawAttributeData: ->
    @el.getAttribute @options.attributeContainer

  _rawAttributeDataToJSON: ->
