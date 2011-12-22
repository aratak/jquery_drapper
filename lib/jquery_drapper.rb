require "jquery_drapper/version"

module JqueryDrapper
  if defined?(::Rails) and ::Rails.version >= "3.1"
    require 'jquery_drapper/rails/engine'
  end
end
