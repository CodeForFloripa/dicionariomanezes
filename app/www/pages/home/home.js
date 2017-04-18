angular.module('diciomane.pages.home', ['utils.localstorage'])
  .controller('HomeCtrl', ['$state', 'DictionarySvc', '$localStorage', 'WordOfTheDaySvc', '$scope', '$filter', '$ionicLoading',
    function($state, dictionary, $localStorage, wordOfTheDay, $scope, $filter, $ionicLoading) {

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
      
//      ctrl.showSpiner = function() {
//        $ionicLoading.show({
//            noBackdrop: false,
//            template: '<ion-spinner class="spinner-positive" icon="ripple"></ion-spinner>',
//            duration: 3000
//        });
//      };

      ctrl.openDictionary = function() {
        $state.go('dictionary');        
      }
      
      ctrl.openSearch = function() {
        $state.go('search')
      }

      ctrl.openCategories = function(categoriesID) {
        $state.go('categories', {id: categoriesID})
      }
  
    }
  ]);
