'use strict'
angular.module('diciomane.telas.verbete',[])
  .controller('VerbeteCtrl', ['$stateParams','DicionarioSvc',
    function($stateParams, dicionario) {

    var ctrl = this;

    this.verbeteID = $stateParams.id;
    dicionario.verbeteComID(this.verbeteID)
      .then(function(verbete) {
        ctrl.verbete = verbete;
        console.log(ctrl)
      })



  }]);
