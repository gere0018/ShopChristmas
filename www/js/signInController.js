angular.module('ShopChristmas')
.controller('SignInCtrl', ['$scope', '$state','Validate', '$ionicPopup', '$cordovaOauth', '$log',
  function($scope, $state, Validate, $ionicPopup, $cordovaOauth, $log) {
  //This function handles the sign in with user name and password
  $scope.signIn = function(username, password) {
    //Make sure user name and password are not empty before validating them
    if(username && password){
        if(Validate.validateUser(username) == true 
          && Validate.validatePassword(password) == true){
          //navigate inside the app to the first tab search
          $state.go('tabs.search');
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
            $ionicPopup.alert({
                  title: "Invalid Log in",
                  content: "Please enter a valid Facebook user name and a password!!"
                });
            console.log(error);
        });
      };
  
}]);

