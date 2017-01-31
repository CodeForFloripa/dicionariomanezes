'use strict'

angular.module('diciomane.pages.categories.tradicao',[])
  .controller('TradicaoCtrl', ['$state', 'DictionarySvc', function($state, dictionary) {

    var ctrl = this;

    ctrl.words = [];
    ctrl.letters = "abcdefghijklmnopqrstuvwxyz".split('')

    ctrl.reloadEntries =  function(letter) {
      ctrl.letter = letter;

      /* IDCategory Tradição is 5 */    
      dictionary.entriesForCategory(letter, 5).then(function(w){
        ctrl.words = w;
      }); 
   }
    
    ctrl.openEntry = function(word) {
      $state.go('entry', {id: word.id})
    }
      
    ctrl.reloadEntries('');

}]);
