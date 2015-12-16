angular.module('ShopChristmas')
.controller('StoreCtrl', ['$scope','StoresData', '$timeout', '$ionicLoading',
    function($scope, StoresData, $timeout, $ionicLoading){
    console.log("inside StoreCtrl");
    StoresData.getStoresForCurrentLocation();
    //show loading icon while we get the data
      $scope.show = function() {
        $ionicLoading.show({
          template: '<ion-spinner></ion-spinner>'
        });
      };
    
    //needed to add a timeout as it takes some time to get back the search results
    $timeout(function(){
      console.log(StoresData.getNearbyStores().data.stores);
      $scope.stores = StoresData.getNearbyStores().data.stores;
      $scope.hide = function(){
        $ionicLoading.hide();
      };
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
        console.log(StoresData.getStores().data.stores);
        $scope.stores = StoresData.getStores().data.stores;;
        
    }, 1000);
       

    }
    

}]);