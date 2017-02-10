'use strict'

angular.module('diciomane.pages.categories',[])
  .controller('CategoriesCtrl', ['$stateParams','$state','DictionarySvc', function($stateParams, $state, dictionary) {

    var ctrl = this;

    ctrl.words = [];
    ctrl.letters = "abcdefghijklmnopqrstuvwxyz".split('');
        
    this.categoryID = $stateParams.id;

        
    ctrl.reloadEntries = function(letter) {
      ctrl.letter = letter;
      
      /* CategoryID parameter */    
      dictionary.entriesForCategory(letter, this.categoryID).then(function(w){
        ctrl.words = w;
      });
        
    }
    
    ctrl.openEntry = function(word) {
      $state.go('entry', {id: word.id})
    }
    
    ctrl.reloadEntries('');
        
}]);