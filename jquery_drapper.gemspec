# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "jquery_drapper/version"

Gem::Specification.new do |s|
  s.name        = "jquery_drapper"
  s.version     = JqueryDrapper::VERSION
  s.authors     = ["Alexey Osipenko"]
  s.email       = ["alexey@osipenko.in.ua"]
  s.homepage    = "http://aratak.github.com/jquery_drapper/"
  s.summary     = %q{Make js code for view unobtrusive.}
  s.description = %q{Create some widget from 'input' source. Unobtrusive.}

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_path  = "lib"

  s.add_dependency "railties", ">= 3.1.0", "< 5.0"
  s.add_dependency "thor",     "~> 0.14"
end
