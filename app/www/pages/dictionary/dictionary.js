'use strict'

angular.module('diciomane.pages.dictionary',[])
  .controller('DictionaryCtrl', ['$state', 'DictionarySvc', function($state, dictionary) {

    var ctrl = this;
      
    ctrl.letters = "abcdefghijklmnopqrstuvwxyz".split('');
    ctrl.emptyEntry = false;
 
    ctrl.reloadEntries =  function(letter) {
      ctrl.letter = letter;
      ctrl.words = [];
      
      dictionary.countEntries(letter).then(function(c){
        if (c.count != 0){
          ctrl.emptyEntry = false;
          dictionary.entriesStartingWith(letter).then(function(w){ ctrl.words = w; })
        }
        else ctrl.emptyEntry = true;
      })
    }    

    ctrl.openEntry = function(word) {
      $state.go('entry', {id: word.id})
    }

    ctrl.reloadEntries('')

  }]);