'use strict'

angular.module('diciomane.pages.categories.inapropriado',[])
  .controller('InapropriadoCtrl', ['$state', 'DictionarySvc', function($state, dictionary) {

    var ctrl = this;

    ctrl.words = [];
    ctrl.letters = "abcdefghijklmnopqrstuvwxyz".split('')

    ctrl.reloadEntries =  function(letter) {
      ctrl.letter = letter;

      /* IDCategory Inapropriado is 7 */    
      dictionary.entriesForCategory(letter, 7).then(function(w){
        ctrl.words = w;
      }); 
   }
    
    ctrl.openEntry = function(word) {
      $state.go('entry', {id: word.id})
    }
      
    ctrl.reloadEntries('');

}]);