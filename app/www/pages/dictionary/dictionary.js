'use strict'

angular.module('diciomane.pages.dictionary',[])
  .controller('DictionaryCtrl', ['$state', 'DictionarySvc', function($state, dictionary) {

    var ctrl = this;

    ctrl.words = [];
    ctrl.letters = "abcdefghijklmnopqrstuvwxyz".split('')

    ctrl.reloadEntries =  function(letter) {
      ctrl.letter = letter;
      dictionary.entriesStartingWith(letter).then(function(w){
        ctrl.words = w;
      })
    }

    ctrl.openEntry = function(word) {
      $state.go('entry', {id: word.id})
    }

    ctrl.reloadEntries('a')


  }]);
