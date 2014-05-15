angular.module('mean.repositories')
.directive('listing', function() {
  return {
    templateUrl: 'public/repositories/templates/listing.html',
    restrict: 'E',
    scope: {
      'list': '=list',
      'title': '=title',
      'size': '=size'
    },
    replace: true
  };
});
