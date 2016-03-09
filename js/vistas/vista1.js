angular.module('myApp.vista1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/vista1', {
    templateUrl: 'html/vista1.html',
    controller: 'Vista1Ctrl'
  });
}])

.controller('Vista1Ctrl', [function() {




}]);

