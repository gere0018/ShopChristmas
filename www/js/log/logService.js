angular.module('ShopChristmas')
//create two local storage functions one that saves 
//and another that gets the data from local storage
.factory('LocalStorageService',[function(){
	return{
		getLogsFromLocalStorage: function(key){
			return JSON.parse(localStorage.getItem(key)) || [];
		},
		setLogsInLocalStorage: function(key, value){
			var currentLogs = JSON.parse(localStorage.getItem(key)) || [];
			currentLogs.push(value);
			localStorage.setItem(key, JSON.stringify(currentLogs));
		}
	}

}]);
