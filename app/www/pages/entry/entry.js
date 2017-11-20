'use strict'
angular.module('diciomane.pages.entry',[])
.controller('EntryCtrl', ['$stateParams','DictionarySvc', '$scope', '$timeout','$ionicPopup',
  function($stateParams, dictionary, $scope, $timeout, $ionicPopup) {

  var ctrl = this;
  ctrl.favorite = false;
  this.verbeteID = $stateParams.id;
    
  $scope.pageTitle = "<img class='title-image' src='img/logo-bar-verbet.png' height='70px' width='360px' style='position: fixed; left: 0; right: 0; margin:0 auto; margin-top:-5px;'/>";
 
  dictionary.entryWithID(this.verbeteID).then(function(entry) {
    ctrl.entry = entry;
  });
        
  dictionary.isFavorite(this.verbeteID).then(function(favorites) {
    ctrl.fav = favorites;
    console.log("Visse, gostasse? "+ ctrl.fav.count); // return the number of favorites with the verbete ID. Is always one or nothing
        
    if (ctrl.fav.count)
      ctrl.favorite = true;
    else
      ctrl.favorite = false;
  });
      
  ctrl.showPopup = function(isFavorite) {
   if (isFavorite){
      var myPopup = $ionicPopup.show({
        title: 'Verbete favoritado',
      });
    }
    else {
      var myPopup = $ionicPopup.show({
        title: 'Favorito removido',
      });
    }
      
    $timeout(function() {
      myPopup.close(); //close the popup after 2 seconds
    }, 1500);
  };
      
  ctrl.toggleFavorite = function(favorite) {
    switch(favorite) {
      case true :
        dictionary.addFavorite(this.verbeteID);
        ctrl.showPopup(favorite);
        break;
      case false : 
        dictionary.delFavorite(this.verbeteID);
        ctrl.showPopup(favorite);
        break;
    }
    ctrl.favorite = favorite;    
  };
        
}]);