'use strict'
angular.module('diciomane.pages.entry',[])
  .controller('EntryCtrl', ['$stateParams','DictionarySvc',
    function($stateParams, dictionary) {

    var ctrl = this;

    this.entryID = $stateParams.id;
    dictionary.entry(this.entryID)
      .then(function(entry) {
        ctrl.entry = entry;
        console.log(ctrl)
      })
  }]);
