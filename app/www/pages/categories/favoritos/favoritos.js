'use strict'

angular.module('diciomane.pages.categories.favoritos',[])
  .controller('FavoritosCtrl', ['$state', 'DictionarySvc', function($state, dictionary) {

    var ctrl = this;

    ctrl.words = [];
    ctrl.letters = "abcdefghijklmnopqrstuvwxyz".split('')

    ctrl.reloadEntries =  function(letter) {
      ctrl.letter = letter;

      /* IDCategory Favoritos is 1 */    
      dictionary.entriesForCategory(letter, 1).then(function(w){
        ctrl.words = w;
      }); 
   }
    
    ctrl.openEntry = function(word) {
      $state.go('entry', {id: word.id})
    }
      
    ctrl.reloadEntries('');

}]);
