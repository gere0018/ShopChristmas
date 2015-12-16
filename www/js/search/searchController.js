angular.module('ShopChristmas')
.controller('SearchCtrl', ['$scope','$state', 'SearchData', '$timeout',
 '$ionicSlideBoxDelegate','$ionicLoading',
    function($scope, $state, SearchData, $timeout, $ionicSlideBoxDelegate,$ionicLoading){
    $scope.nehmat = {
        userInput : ""
    }
    $scope.clearInput = function(){
        $scope.nehmat.userInput = "";
        console.log("badri");
    }
    $scope.getData = function(){
      console.log("inside getData function");
      SearchData.getSearchData($scope.nehmat.userInput);
       //show loading icon while we get the data
      $ionicLoading.show({
        template: '<ion-spinner icon = "ios" class= "spinner-assertive"></ion-spinner>'
      });

    
      //needed to add a timeout as it takes some time to get back the search results
      $timeout(function(){
        console.log(SearchData.getResults().data.products);
        $scope.searches = SearchData.getResults().data.products
        //hide loading icon
        $ionicLoading.hide();
        $ionicSlideBoxDelegate.update();
      }, 1000);

    }
    

}]);