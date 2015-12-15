angular.module('ShopChristmas')
.factory('SearchData', ['$http', function($http) {
  var searchResults;
  return{
    getSearchData: function(userInput){
      $http.get("http://api.bestbuy.com/v1/products((search="
        + userInput + 
        "))?show=name,sku,salePrice,image&format=json&apiKey=5w2n4mecqg8awc9sbba26gps")
        .then(function(data){
          console.log(" this is the " + userInput);
             searchResults = data;                       
          }, function(error){
          console.log(error);
          });
        },
    getResults: function(){
      return searchResults;
    }

  };
}]);