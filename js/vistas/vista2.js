angular.module('myApp.vista2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/vista2', {
    templateUrl: 'html/vista2.html',
    controller: 'Vista2Ctrl'
  });
}])

.controller('Vista2Ctrl', [function() {

}]);