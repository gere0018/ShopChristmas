angular.module('ShopChristmas')
.controller('StoreCtrl', ['$scope','StoresData', '$timeout', '$ionicLoading',
    function($scope, StoresData, $timeout){
    console.log("inside StoreCtrl");
    StoresData.getStoresForCurrentLocation(); 
    //needed to add a timeout as it takes some time to get back the search results
    $timeout(function(){
      console.log(StoresData.getNearbyStores().data.stores);
      $scope.stores = StoresData.getNearbyStores().data.stores;
    }, 5000);

    $scope.store = {
        city : ""
    }
   
    $scope.clearCityInput = function(){
        $scope.store.city = "";
    }
    $scope.getStoresData = function(){
      console.log("inside getData function");
      StoresData.getCityStores($scope.store.city);
      $timeout(function(){
        if(StoresData.getStores()){
           console.log(StoresData.getStores().data.stores);
          $scope.stores = StoresData.getStores().data.stores;
        }
       
        
    }, 1000);
       

    }
    

}]);