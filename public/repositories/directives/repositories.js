angular.module('mean.repositories')
.directive('listing', function() {
  return {
    template: '<ul ng-repeat="element in list">' +
        '<li>{{element.name}} - {{element.value}}</li>' +
        '</ul>',
    restrict: 'E',
    scope: {
      'list': '='
    }
  };
});
