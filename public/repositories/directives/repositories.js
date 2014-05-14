angular.module('mean.repositories')
.directive('listing', function() {
  return {
    template: '<ul ng-repeat="element in list">' +
        '<li>{{element.info.name}} - {{element.info.linesOfCode}}</li>' +
        '</ul>',
    restrict: 'E',
    scope: {
      'list': '='
    }
  };
});
