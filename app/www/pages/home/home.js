angular.module('diciomane.pages.home',[])
  .controller('HomeCtrl', ['$state', 'DictionarySvc',
    function($state, dictionary) {

      var ctrl = this;

      // Selects a random entry to be displayed in the home
      dictionary.allEntries().then(
        function(entries) {
          ctrl.entry = entries[Math.floor(Math.random()*entries.length)]
        }
      )

      ctrl.openEntry = function(entry) {
        $state.go('entry', {id: entry.id})
      }

      ctrl.openDictionary = function() {
        $state.go('dictionary')
      }

      ctrl.openSearch = function() {
        $state.go('search')
      }

  }]);
