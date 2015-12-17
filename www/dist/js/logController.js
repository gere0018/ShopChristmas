angular.module('ShopChristmas')
.controller('LogCtrl', ['$scope','LocalStorageService', 
	function($scope, LocalStorageService){
		console.log("inside LogCtrl");
		$scope.logs = 
		LocalStorageService.getLogsFromLocalStorage('gere0018-ShopChristmas-logs');
		console.log($scope.logs);

}]);
