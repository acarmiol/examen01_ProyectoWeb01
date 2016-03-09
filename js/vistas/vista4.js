angular.module('myApp.vista4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/vista4', {
    templateUrl: 'html/vista4.html',
    controller: 'Vista4Ctrl'
  });
}])

.controller('Vista4Ctrl', [function() {

}]);