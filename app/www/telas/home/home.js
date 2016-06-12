angular.module('diciomane.telas.home',[])
  .controller('HomeCtrl', ['$state', 'DicionarioSvc',
    function($state, dicionarioSvc) {

      var ctrl = this;
      dicionarioSvc.verbetes().then(
        function(verbetes) {
          ctrl.verbete = verbetes[Math.floor(Math.random()*verbetes.length)]
          console.log(ctrl.verbete)
        }
      )

      ctrl.irParaVerbete = function(verbete) {
        $state.go('verbete', {id: verbete.id})
      }

      ctrl.irParaDicionario = function() {
        $state.go('dicionario')
      }

      ctrl.irParaBusca = function() {
        $state.go('busca')
      }

  }]);
