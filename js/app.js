

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.vista1',
  'myApp.vista2',
  'myApp.vista3',
  'myApp.vista4'
  
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/vista1'});
}]);

