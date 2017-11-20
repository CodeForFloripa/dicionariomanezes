angular.module('diciomane.pages.search', [])
.controller('SearchCtrl', ['DictionarySvc', '$state', '$scope', function(dictionary, $state, $scope) {
  var ctrl = this;
  ctrl.entries = {};
  ctrl.entry = "";
      
  $scope.pageTitle = "<img class='title-image' src='img/logo-bar-search.png' height='70px' width='360px' style='position: fixed; left: 0; right: 0; margin:0 auto; margin-top:-5px;'/>";

  ctrl.search = function() {
    console.log(ctrl.entry);
    if (ctrl.entry.length >= 3) {
      dictionary.searchEntries(ctrl.entry).then(function(entries) {
        ctrl.entries = entries;
        console.log(entries);
      });
    } else ctrl.entries = {};
  };

  ctrl.openEntry = function(word) {
    $state.go('entry', {
      id: word.id
    })
  };
}]);