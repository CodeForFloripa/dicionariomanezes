'use strict'
angular.module('diciomane.pages.entry',[])
  .controller('EntryCtrl', ['$stateParams','DictionarySvc',
    function($stateParams, dictionary) {

    var ctrl = this;
    ctrl.favorite = false;
    this.verbeteID = $stateParams.id;

        
    dictionary.entryWithID(this.verbeteID)
      .then(function(entry) {
        ctrl.entry = entry;
    });
        
        
    dictionary.isFavorite(this.verbeteID)
      .then(function(favorites) {
        ctrl.fav = favorites;
        console.log("Visse, gostasse? "+ ctrl.fav.count); // return the number of favorites with the verbete ID. Is always one or nothing
        
        if (ctrl.fav.count)
          ctrl.favorite = true;
        else
          ctrl.favorite = false;
    });
        
      
    ctrl.toggleFavorite = function(favorite) {
      switch(favorite) {
        case true :
          dictionary.addFavorite(this.verbeteID);
          break;
        case false : 
          dictionary.delFavorite(this.verbeteID);
          break;
      }
      ctrl.favorite = favorite;    
    };
        
        
  }]);
