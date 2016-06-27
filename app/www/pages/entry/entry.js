'use strict'
angular.module('diciomane.pages.entry',[])
  .controller('EntryCtrl', ['$stateParams','DictionarySvc',
    function($stateParams, dictionary) {

    var ctrl = this;

    this.verbeteID = $stateParams.id;
    dictionary.verbeteComID(this.entryID)
      .then(function(entry) {
        ctrl.entry = entry;
        console.log(ctrl)
      })



  }]);
