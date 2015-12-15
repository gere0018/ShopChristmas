angular.module('ShopChristmas')

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
.controller('SignInCtrl', ['$scope', '$state','Validate', '$ionicPopup', '$cordovaOauth', 
  function($scope, $state, Validate, $ionicPopup, $cordovaOauth) {
  //This function handles the sign in with user name and password
  $scope.signIn = function(username, password) {
    //Make sure user name and password are not empty before validating them
    if(username && password){
        if(Validate.validateUser(username) == true 
          && Validate.validatePassword(password) == true){
          //navigate inside the app to the first tab search
          $state.go('tabs.search');
        }else{
          //determine the content of the pop up based on the error made by the user
          var alertContent = "";
          var alertTitle = "";
          if (Validate.validateUser(username) == false
             && Validate.validatePassword(password) == false){
            alertTitle = 'Invalid Credentials'
            alertContent = 'User name and password are not valid. Please try again!!!'
          }else if(Validate.validateUser(username) == false){
            alertTitle = 'Invalid User name'
            alertContent = 'This is not a valid user name. Please try again!!!'
          }else if (Validate.validatePassword(password) == false){
            alertTitle = 'Invalid password'
            alertContent = 'This is not a valid password. Please try again!!!'
          }
          $ionicPopup.alert({
                  title: alertTitle,
                  content: alertContent
                });
        }
      }else{
        //Alert the user to enter input in both fields
        $ionicPopup.alert({
                  title: "Empty Fields",
                  content: "Please enter a user name and a password to log in !!!"
                });

      }
    
  };

  //This function handles signing in with facebook
  $scope.facebookSignin = function() {
        $cordovaOauth.facebook("1714367412128609", ["email"]).then(function(result) {
            // results
            //navigate inside the app to the first tab search
            $state.go('tabs.search');
            console.log(JSON.stringify(result));


        }, function(error) {
            // error
            alert("wrong facebook");
            console.log(error);
        });
      };
  
}])

.controller('HomeTabCtrl',['$scope',function($scope) {
  console.log('HomeTabCtrl');
}])



.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
