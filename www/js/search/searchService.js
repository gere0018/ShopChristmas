angular.module('ShopChristmas')
.factory('SearchData', ['$http', '$ionicLoading', '$ionicPopup', function($http,$ionicLoading, $ionicPopup) {
  var searchResults;
  return{
    getSearchData: function(userInput){
      if (userInput) {
          //show loading icon while we get the data
          $ionicLoading.show({
            template: '<ion-spinner icon = "ios" class= "spinner-assertive"></ion-spinner>'
          });
          $http.get("http://api.bestbuy.com/v1/products((search="
            + userInput + 
            "))?show=name,sku,salePrice,image&format=json&apiKey=5w2n4mecqg8awc9sbba26gps")
            .then(function(searchData){
              console.log(searchData); 
              //handle Scenario where we don't get any search result
              if(searchData.data.products.length == 0){
                //hide loading icon
                $ionicLoading.hide();
                $ionicPopup.alert({
                      title: "No items found!!!",
                      content: "There are currently no items that match you search!! Please try again."
                    });
              }else{
                searchResults = searchData;               
              }
                                     
              }, function(error){
              console.log(error);
              });
          }else{
            $ionicPopup.alert({
                      title: "Invalid search",
                      content: "Please enter a product name!!!"
                    });
          }
        },
    getResults: function(){
      //hide loading icon
      $ionicLoading.hide();
      return searchResults;       
    }

  };
}]);