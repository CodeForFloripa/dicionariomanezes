angular.module('diciomane.pages.search', [])
  .controller('SearchCtrl', ['DictionarySvc', '$state', function(dictionary,
    $state) {
    var ctrl = this;
    ctrl.entries = {};
    ctrl.entry = "";

    ctrl.search = function() {
      console.log(ctrl.entry);
      if (ctrl.entry.length >= 3) {
        dictionary.search(ctrl.entry).then(function(entries) {
          ctrl.entries = entries;
          console.log(entries);
        });
      } else {
        ctrl.entries = {};
      }
    };

    ctrl.openEntry = function(word) {
      $state.go('entry', {
        id: word.id
      })
    };
  }]);
