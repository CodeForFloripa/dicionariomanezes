'use strict'

angular.module('diciomane.pages.home', ['utils.localstorage'])
.controller('HomeCtrl', ['$state', 'DictionarySvc', '$localStorage', 'WordOfTheDaySvc', '$scope', '$filter', '$ionicLoading',
  function($state, dictionary, $localStorage, wordOfTheDay, $scope, $filter, $ionicLoading) {

    var ctrl = this;
        
    $scope.pageTitle = "<img class='title-image' src='img/logo-bar.png' width='1040px'/>";
    $scope.date_pt_br = $filter('date')(Date.now(), "dd 'de' MMMM");

    wordOfTheDay(new Date()).then(function(e) {
      ctrl.entry = e
    })

    ctrl.openEntry = function(entry) {
      $state.go('entry', {
        id: entry.id
      })
    }
      
    ctrl.showSpinner = function(){     
      $ionicLoading.show({
        noBackdrop :false,
        animation: 'fade-in',
        template: ' <ion-spinner icon="ripple" class="spinner-light" style=""></ion-spinner>',
        duration :1500//Optional
      });
      //$ionicLoading.hide();//Hide it after Something is completed
    }

    ctrl.openDictionary = function() {
      ctrl.showSpinner();
      $state.go('dictionary');
    }
      
    ctrl.openSearch = function() {
      $state.go('search')
    }

    ctrl.openCategories = function(categoriesID) {
      ctrl.showSpinner();
      $state.go('categories', {id: categoriesID})
    }
      
    ctrl.openAbout = function() {
      $state.go('about')
    }

  }
]);