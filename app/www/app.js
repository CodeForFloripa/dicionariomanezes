// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('diciomane', ['ionic',
  'ngCordova',
  'diciomane.pages.entry',
  'diciomane.pages.search',
  'diciomane.pages.dictionary',
  'diciomane.pages.home',
  'diciomane.pages.categories.favoritos',
  'diciomane.pages.categories.elogios',
  'diciomane.pages.categories.xingamentos',
  'diciomane.pages.categories.boteco',
  'diciomane.pages.categories.tradicao',
  'diciomane.pages.categories.expressoes',
  'diciomane.pages.categories.inapropriado',
  'diciomane.svc.dictionary',
  'diciomane.svc.database',
  'diciomane.svc.wordoftheday',
  'ngMaterial'
])

.run(function($ionicPlatform, $cordovaSQLite) {
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

    .state('home', {
      url: '/home',
      templateUrl: 'pages/home/_home.html'
    })
    .state('entry', {
      url: '/entry/:id',
      templateUrl: 'pages/entry/_entry.html'
    })
    .state('dictionary', {
      url: '/dictionary',
      templateUrl: 'pages/dictionary/_dictionary.html'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'pages/search/_search.html'
    })
    .state('favoritos', {
      url: '/favoritos',
      templateUrl: 'pages/categories/favoritos/_favoritos.html'
    })
    .state('elogios', {
      url: '/elogios',
      templateUrl: 'pages/categories/elogios/_elogios.html'
    })
    .state('xingamentos', {
      url: '/xingamentos',
      templateUrl: 'pages/categories/xingamentos/_xingamentos.html'
    })
    .state('boteco', {
      url: '/boteco',
      templateUrl: 'pages/categories/boteco/_boteco.html'
    })
    .state('tradicao', {
      url: '/tradicao',
      templateUrl: 'pages/categories/tradicao/_tradicao.html'
    })
    .state('expressoes', {
      url: '/expressoes',
      templateUrl: 'pages/categories/expressoes/_expressoes.html'
    })
    .state('inapropriado', {
      url: '/inapropriado',
      templateUrl: 'pages/categories/inapropriado/_inapropriado.html'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});
