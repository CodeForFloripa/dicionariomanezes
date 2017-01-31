'use strict'

angular.module('diciomane.pages.categories.expressoes',[])
  .controller('ExpressoesCtrl', ['$state', 'DictionarySvc', function($state, dictionary) {

    var ctrl = this;

    ctrl.words = [];
    ctrl.letters = "abcdefghijklmnopqrstuvwxyz".split('')

    ctrl.reloadEntries =  function(letter) {
      ctrl.letter = letter;

      /* IDCategory Expressões is 6 */    
      dictionary.entriesForCategory(letter, 6).then(function(w){
        ctrl.words = w;
      }); 
   }
    
    ctrl.openEntry = function(word) {
      $state.go('entry', {id: word.id})
    }
      
    ctrl.reloadEntries('');

}]);
