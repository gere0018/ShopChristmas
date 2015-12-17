angular.module('ShopChristmas')
.factory('ValidateSignIn', ['$ionicPopup', '$log', '$cordovaOauth', '$http', 
  function($ionicPopup, $log, $cordovaOauth, $http) {
    var userName;
  return{
    validateUser: function(username){
      //compare the username input to the string guest
      if(username){
        if(username.toLowerCase() === "guest"){
          $ionicPopup.alert({
                  title: 'Invalid User name',
                  content: 'This is not a valid user name. Please try again!!!'
                });
          $log.debug("Invalid User name");
          return false;
        }else{
          return true;
        }
      }else{
        //username field is left empty
        $ionicPopup.alert({
                  title: "Empty user name",
                  content: "Please enter a user name to log in !!!"
        });
        $log.debug("Empty User name");
      }
    },
    validatePassword: function(password){
      if(password){
          if(password.length >= 5){
            return true;
          }else{
            $ionicPopup.alert({
                  title: 'Invalid password',
                  content: 'This is not a valid password. Please try again!!!'
              });
            $log.debug("Invalid password");
            return false;
          }
      }else{
        //password field is left empty
        $ionicPopup.alert({
                  title: "Empty password",
                  content: "Please enter a password to log in !!!"
        });
        $log.debug("Empty password");
      }
    },
    validateFacebook: function(callbackFn){
      $cordovaOauth.facebook("1714367412128609", ["email"])
      .then(function(result) {
          console.log(JSON.stringify(result));      
          $http.get("https://graph.facebook.com/v2.5/me", 
            { params: { access_token: result.access_token, 
              fields: "id,name,gender,location,website,picture,relationship_status", 
              format: "json" }})
            .then(callbackFn, 
              function(error) {
                  alert("There was a problem getting your profile. Check the logs for details.");
                  console.log(error);
              });
              
        }, function(error) {
            // error, login was incorrect
            $ionicPopup.alert({
                  title: "Invalid Log in",
                  content: "Please enter a valid Facebook user name and a password!!" 
                 
              });
            $log.debug("Invalid Facebook Login");
            console.log(error);
          });
         
      }    
    };

  }]);
