angular.module('ShopChristmas')
.controller('SearchCtrl', ['$scope','$state', 'SearchData', '$timeout', '$ionicSlideBoxDelegate',
    function($scope, $state, SearchData, $timeout, $ionicSlideBoxDelegate){
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
      //needed to add a timeout as it takes some time to get back the search results
      $timeout(function(){
        console.log(SearchData.getResults().data.products);
        $scope.searches = SearchData.getResults().data.products;
        $ionicSlideBoxDelegate.update();
      }, 500);

    }
    

}]);