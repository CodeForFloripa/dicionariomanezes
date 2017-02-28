'use strict'

angular.module('diciomane.pages.categories',[])
  .controller('CategoriesCtrl', ['$stateParams','$state','DictionarySvc', function($stateParams, $state, dictionary) {

    var ctrl = this;

    ctrl.words = [];
    ctrl.letters = "abcdefghijklmnopqrstuvwxyz".split('');
    ctrl.categoryName = "";
        
    this.categoryID = $stateParams.id;
      
    switch(this.categoryID){
      case '1':
        ctrl.categoryName = "Favoritos";
        break;
      case '2':
        ctrl.categoryName = "Elogios";
        break;
      case '3':
        ctrl.categoryName = "Xingamentos";
        break;
      case '4':
        ctrl.categoryName = "Boteco";
        break;
      case '5':
        ctrl.categoryName = "Tradição";
        break;
      case '6':
        ctrl.categoryName = "Expressões";
        break;
      case '7':
        ctrl.categoryName = "Inapropriado";
    }  
        
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