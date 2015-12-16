angular.module('ShopChristmas')
.factory('StoresData', ['$http', '$cordovaGeolocation', '$ionicLoading', '$ionicPopup',
 function($http,$cordovaGeolocation, $ionicLoading, $ionicPopup) {
	var nearbyStoresData;
	var cityStores;
  return{
  	
    getStoresForCurrentLocation: function(){
    //show loading icon while we get the data
      $ionicLoading.show({
        template: '<ion-spinner icon = "ios" class= "spinner-assertive"></ion-spinner>'
      });
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
	      .then(function(storesData){
	      	console.log(storesData);  
	      	 if(storesData.data.stores.length == 0){
	            //hide loading icon
	            $ionicLoading.hide();
	            $ionicPopup.alert({
	                  title: "No Stores found!!!",
	                  content: "There are currently no stores near your location!!"
	            });
	            nearbyStoresData = storesData;     
	        }else{
	        	nearbyStoresData = storesData;     
	        }
		      		
             	            
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
		$ionicLoading.hide();
		return nearbyStoresData;
	},
   	getCityStores: function(city){
   		if(city){
	   		//show loading icon while we get the data
	      $ionicLoading.show({
	        template: '<ion-spinner icon = "ios" class= "spinner-assertive"></ion-spinner>'
	      });
		  	$http.get("http://api.bestbuy.com/v1/stores(city=" +
		  		city +
		  	")?format=json&apiKey=5w2n4mecqg8awc9sbba26gps")
		  	.then(function(cityData){
		          console.log(cityData);
		          if(cityData.data.stores.length == 0){
		            //hide loading icon
		            $ionicLoading.hide();
		            $ionicPopup.alert({
		                  title: "No Stores found!!!",
		                  content: "There are currently no stores in the city you entered!!"
		                  + " Make sure you entered a valid city name in USA."
		            });      
			        }else{
			        	cityStores = cityData;     
			        }
		                                
		          }, function(error){
		          console.log(error);
		          });
		  }else{
		  	$ionicPopup.alert({
	                  title: "Invalid City",
                      content: "Please enter a city name in USA!!!"
		            });
		  }
    },
    getStores: function(){
    	$ionicLoading.hide();
    	return cityStores;
    }
  }
}]);