angular.module('ShopChristmas')
//create two local storage functions one that saves 
//and another that gets the data from local storage
.factory('LocalStorageService',[function(){
	return{
		getLogsFromLocalStorage: function(key){
			JSON.parse(localStorage.getItem(key));

		},
		setLogsInLocalStorage: function(key, value){
			localStorage.setItem(key, JSON.stringify(value));
		}
	}

}]);
