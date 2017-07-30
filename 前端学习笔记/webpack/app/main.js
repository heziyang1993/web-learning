var $ = require('jquery');

window.$ = window.jQuery = $;

var angular = require('angular');

var app = angular.module('xxx',[]);

app.bootstrap(document.body,['xxx'])

require('./controller.js')(app)

require('weui');