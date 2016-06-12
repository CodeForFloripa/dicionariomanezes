// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('diciomane', ['ionic',
  'diciomane.telas.verbete',
  'diciomane.telas.busca',
  'diciomane.telas.dicionario',
  'diciomane.telas.home',
  'diciomane.svc.dicionario',
  'ngMaterial'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
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

  .state('home', {
    url: '/home',
    templateUrl: 'telas/home/_home.html'
  })
  .state('verbete', {
    url: '/verbete/:id',
    templateUrl: 'telas/verbete/_verbete.html'
  })
  .state('dicionario', {
    url: '/dicionario',
    templateUrl: 'telas/dicionario/_dicionario.html'
  })
  .state('busca', {
    url: '/busca',
    templateUrl: 'telas/busca/_busca.html'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});
