angular.module('ShopChristmas')
.factory('Validate', function() {
  return{
    validateUser: function(user){
      //compare the username input to the string guest
      if(user.toLowerCase() === "guest"){
        return false;
      }else{
        return true;
      }
    },
    validatePassword: function(password){
      if(password.length >= 5){
        return true;
      }else{
        return false;
      }
    }

  };



  });
