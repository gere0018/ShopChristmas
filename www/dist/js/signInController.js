angular.module('ShopChristmas')
.controller('SignInCtrl', ['$scope','$state','ValidateSignIn', '$ionicPopup',
  function($scope,$state, ValidateSignIn, $ionicPopup) {
  //This function handles the sign in with user name and password
  $scope.signIn = function(username, password) {
        if(ValidateSignIn.validateUser(username) === true && ValidateSignIn.validatePassword(password) === true){
          $ionicPopup.alert({
                title: 'Welcome ' +  username ,
                content: 'You have successfully logged in!'                
                });
          //navigate inside the app to the first tab search
          $state.go('tabs.search');
          //empty the input fields
          username = "";
          password = "";
        }   
    };

  //This function handles signing in with facebook
  $scope.facebookSignin = function() {
    ValidateSignIn.validateFacebook(getResult);
      
   };
    var getResult = function (result) {        
            $state.go('tabs.search');
            console.log( 'inside getResult ');
             $ionicPopup.alert({
                title: 'Success',
                content: 'Welcome ' +  JSON.stringify(result.data.name) +
                'You have successfully logged in!' 
                });
                         
    };    

  }]);

