angular.module('ShopChristmas', ['ionic','ngCordova'])
//This code is for the logs decoration from error logging module
//it adds time stamp to the error, we can also add the localstorage functionality here.
  .decorator( '$log', [ '$delegate', 'LocalStorageService',
   function( $delegate, LocalStorageService ){
       // Save the original $log.debug()
       var debugFn = $delegate.debug; 
       $delegate.debug = function( ){
         var args = [].slice.call(arguments),
            now = new Date().toString();
        
         // Prepend timestamp
         args[0] =  [ now, ' -- Error Message: ' , args[0] ].join('');

         // Save decorated Log to local storage using the service we created
         LocalStorageService.setLogsInLocalStorage('gere0018-ShopChristmas-logs', args[0]);

         // Call the original with the output prepended with formatted timestamp
         debugFn.apply(null, args)
       };       
       return $delegate;
      }
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
   $stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.search', {
      url: '/search',
      views: {
        'search-tab': {
          templateUrl: 'templates/search.html',
          controller: 'SearchCtrl'
        }
      }
    })
    .state('tabs.myStore', {
      url: '/myStore',
      views: {
        'myStore-tab': {
          templateUrl: 'templates/my-store.html',
          controller:'StoreCtrl'
        }
      }
    })
    .state('tabs.logs', {
      url: '/logs',
      views: {
        'logs-tab': {
          templateUrl: 'templates/logs.html',
          controller: 'LogCtrl'
        }
      }
    })


   $urlRouterProvider.otherwise('/sign-in');

});
