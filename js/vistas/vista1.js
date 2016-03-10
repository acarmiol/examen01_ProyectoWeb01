angular.module('myApp.vista1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/vista1', {
    templateUrl: 'html/vista1.html',
    controller: 'Vista1Ctrl'
  });
}])

.controller('Vista1Ctrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

	var ref = new Firebase('https://mybankacct.firebaseio.com/account');

	$scope.account = $firebaseArray(ref);

	$scope.showAddForm = function() {
		$scope.addFormShow = true;

	}

	$scope.showAddMovement = function(){
		$scope.addMovementShow = true;
	}

	$scope.hide = function(){
		$scope.accountShow = false;
	}

	$scope.addFormSubmit = function(){
		console.log('Adding Account...');
		if($scope.name){ var name = $scope.name; } else { var name = null; }
		if($scope.tipo){ var tipo = $scope.tipo; } else { var tipo = null; }
		if($scope.moneda){ var moneda = $scope.moneda; } else { var moneda = null; }

		$scope.account.$add({
			name : name,
			tipo : tipo,
			moneda : moneda
		}).then(function(ref){
			var id = ref.key();
			console.log('added contact with id' + id);

			clearFields();

			$scope.addFormShow = false;

			$scope.msg = "cuenta creada";
		});

	}

	$scope.showAccount = function(account){
		$scope.name = account.name;
		$scope.tipo = account.tipo.singleSelect;
		$scope.moneda = account.moneda.singleSelect;

		$scope.accountShow = true;
	}

	function clearFields(){
		$scope.name = "";
		$scope.tipo = "";
		$scope.moneda = "";
	}

	$scope.addMovementSubmit = function(){
		console.log('Adding Movement...');
	}



}]);

