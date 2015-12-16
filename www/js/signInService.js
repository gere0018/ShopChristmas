angular.module('ShopChristmas')
.factory('Validate', ['$ionicPopup', '$log', function($ionicPopup, $log) {
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

            return false;
          }
      }else{
        //password field is left empty
        $ionicPopup.alert({
                  title: "Empty password",
                  content: "Please enter a password to log in !!!"
        });
      }
    }

  };



  }]);
