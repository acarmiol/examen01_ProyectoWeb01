angular.module('myApp.vista1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/vista1', {
    templateUrl: 'html/vista1.html',
    controller: 'Vista1Ctrl'
  });
}])

.controller('Vista1Ctrl', ['$scope', '$firebaseArray', '$filter', function($scope, $firebaseArray, $filter) {

	var ref = new Firebase('https://mybankacct.firebaseio.com/account');

	$scope.account = $firebaseArray(ref);

	$scope.showAddForm = function() {
		$scope.addFormShow = true;

	}

	$scope.showEditForm = function(account){
		$scope.editFormShow = true;

		$scope.id = account.$id;

		$scope.name = accounts.name;
		$scope.tipo = accounts.tipo.singleSelect;
		$scope.moneda = accounts.moneda.singleSelect;

		

		$scope.movements.fecha = accounts[0].fecha;
		$scope.movements.amount = accounts[0].amount;
		$scope.movements.detail = account[0].detail;



		$scope.name = account.name;
		$scope.tipo = account.tipo.singleSelect;
		$scope.moneda = account.moneda.singleSelect;

	}



	// $scope.showAddMovement = function(){
	// 	$scope.addMovementShow = true;
	// }

	$scope.hide = function(){
		$scope.addFormShow = false;
		$scope.accountShow = false;
	}

	$scope.addFormSubmit = function(){
		console.log('Adding Account...');
		if($scope.name){ var name = $scope.name; } else { var name = null; }
		if($scope.tipo){ var tipo = $scope.tipo; } else { var tipo = null; }
		if($scope.moneda){ var moneda = $scope.moneda; } else { var moneda = null; }

		if($scope.fecha){ var fecha = $scope.fecha; } else { var fecha = null; }
		if($scope.amount){ var amount = $scope.amount; } else { var amount = null; }
		if($scope.detail){ var moneda = $scope.detail; } else { var detail = null; }

		$scope.account.$add({
			name : name,
			tipo : tipo,
			moneda : moneda,

			movements : [{
				fecha: fecha,
				amount :amount,
				detail: detail
			}]
			

		}).then(function(ref){
			var id = ref.key();

			console.log('contact id:' +id)
			

			clearFields();

			$scope.addFormShow = false;

			$scope.msg = "cuenta creada";
		});

	}

	$scope.editFormSubmit = function(){


		var id = $scope.id;

		var record = $scope.account.$getRecord(id);

		record.name = $scope.name;
		record.tipo = $scope.tipo.singleSelect;
		record.moneda = $scope.moneda.singleSelect;

		record.movements[0].fecha= $scope.fecha.value;
		record.movements[0].amount = $scope.amount;
		record.movements[0].detail = $scope.detail;




		$scope.account.$save(record).then(function(ref){
			console.log(ref.key);
		});
		clearFields();

		$scope.editFormShow = false;

		$scope.msg = "cuenta actualizada";


	}


	$scope.showAccount = function(account){
		$scope.name = account.name;
		$scope.tipo = account.tipo.singleSelect;
		$scope.moneda = account.moneda.singleSelect;

		// $scope.fecha =  account.movements[0].fecha;
		// $scope.amount = account.movements[0].amount;
		// $scope.detail = account.movements[0].detail;

		$scope.accountShow = true;
	}

	$scope.removeAccount = function(accounts){
		

		$scope.account.$remove(accounts);

		$scope.msg="Account Removed";
	}

	function clearFields(){
		$scope.name = "";
		$scope.tipo = "";
		$scope.moneda = "";
		$scope.fecha = "";
		$scope.amount = "";
		$scope.detail = "";
	}

	var orderBy = $filter('orderBy');

	$scope.order = function(predicate) {
	    $scope.predicate = predicate;
	    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
	    $scope.account = orderBy($scope.account, predicate, $scope.reverse);
	  };

	


}]);

