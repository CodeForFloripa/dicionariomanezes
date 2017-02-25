angular.module('diciomane.pages.home', ['utils.localstorage'])
  .controller('HomeCtrl', ['$state', 'DictionarySvc', '$localStorage', 'WordOfTheDaySvc', '$scope', '$filter',
    function($state, dictionary, $localStorage, wordOfTheDay, $scope, $filter) {

      var ctrl = this;
        
      $scope.date_pt_br = $filter('date')(Date.now(), "dd 'de' MMMM");

      wordOfTheDay(new Date())
        .then(function(e) {
          ctrl.entry = e
        })

      ctrl.openEntry = function(entry) {
        $state.go('entry', {
          id: entry.id
        })
      }

      ctrl.openDictionary = function() {
        $state.go('dictionary')
      }

      ctrl.openSearch = function() {
        $state.go('search')
      }

      ctrl.openCategories = function(categoriesID) {
        $state.go('categories', {id: categoriesID})
      }
      
      ctrl.openFavoritos = function() {
        $state.go('favoritos')
      }
      
      ctrl.openElogios = function() {
        $state.go('elogios')
      }
      
      ctrl.openXingamentos = function() {
        $state.go('xingamentos')
      }
      
      ctrl.openBoteco = function() {
        $state.go('boteco')
      }
      
      ctrl.openTradicao = function() {
        $state.go('tradicao')
      }
      
      ctrl.openExpressoes = function() {
        $state.go('expressoes')
      }
      
      ctrl.openInapropriado = function() {
        $state.go('inapropriado')
      }
    }
  ]);
