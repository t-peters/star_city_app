'use strict';

angular.module('StarCityApp')
  .directive('ngThumb.js', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the ngThumb.js directive');
      }
    };
  });
