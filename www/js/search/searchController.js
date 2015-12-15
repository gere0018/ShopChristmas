angular.module('ShopChristmas')
.controller('SearchCtrl', ['$scope','$state', 'SearchData', '$timeout',
    function($scope, $state, SearchData, $timeout){
    $scope.nehmat = {
        userInput : ""
    }
    $scope.getData = function(){
      console.log("inside getData function");
      SearchData.getSearchData($scope.nehmat.userInput);
      //needed to add a timeout as it takes some time to get back the search results
      $timeout(function(){
        console.log("badri");
        console.log(SearchData.getResults().data.products);
        $scope.searches = SearchData.getResults().data.products;
      }, 1000);

    }
    

}]);