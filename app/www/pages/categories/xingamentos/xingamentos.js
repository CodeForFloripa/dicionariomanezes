'use strict'

angular.module('diciomane.pages.categories.xingamentos',[])
  .controller('XingamentosCtrl', ['$state', 'DictionarySvc', function($state, dictionary) {

    var ctrl = this;

    ctrl.words = [];
    ctrl.letters = "abcdefghijklmnopqrstuvwxyz".split('')

    ctrl.reloadEntries =  function(letter) {
      ctrl.letter = letter;

      /* IDCategory Xingamentos is 3 */    
      dictionary.entriesForCategory(letter, 3).then(function(w){
        ctrl.words = w;
      }); 
   }
    
    ctrl.openEntry = function(word) {
      $state.go('entry', {id: word.id})
    }
      
    ctrl.reloadEntries('');

}]);
