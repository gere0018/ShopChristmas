angular.module('ShopChristmas')
.factory('StoresData', ['$http', '$cordovaGeolocation', function($http,$cordovaGeolocation) {
	var nearbyStoresData;
	var cityStores;
  return{
  	
    getStoresForCurrentLocation: function(){
	   // get the nearby stores based on user's current location
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
	  $cordovaGeolocation
	    .getCurrentPosition(posOptions)
	    .then(function (position) {
	      var lat  = position.coords.latitude;
	      var long = position.coords.longitude;
	      $http.get("http://api.bestbuy.com/v1/stores(area("
	      	+ lat +","+ long + 
	      	//since this api shows only stores in US, i increased the milage to get some results
	      	",1000000000))?format=json&apiKey=5w2n4mecqg8awc9sbba26gps")
	      .then(function(data){
	      		console.log(data);  
             	nearbyStoresData = data;                 
          }, function(error){
          	//error in case we are not able to get the data back
          	console.log(error);
          });
       
	    }, function(err) {
	      // error in case of failure to use geolocation
	      console.log(err);
	    });

	},
	getNearbyStores:function(){
		return nearbyStoresData;
	},
   	getCityStores: function(city){
	  	$http.get("http://api.bestbuy.com/v1/stores(city=" +
	  		city +
	  	")?format=json&apiKey=5w2n4mecqg8awc9sbba26gps")
	  	.then(function(cityData){
	          console.log(cityData);
	             cityStores = cityData;                     
	          }, function(error){
	          console.log(error);
	          });
    },
    getStores: function(){
    	return cityStores;
    }
  }
}]);