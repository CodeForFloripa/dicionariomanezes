'use strict'
angular.module('diciomane.svc.dicionario', [])
  .service('DicionarioSvc', ['$http', function($http) {

    /**
     * Lista de verbetes
     * @type {Array} de verbetes
     */
    var _verbetes = []
    var _mapa_verbetes = {}

    /**
     * Busca verbetes que comecem com um letra
     * @param  {string} letra letra inicial
     * @return {Promise<Array<Verbete>>}
     */
    function filtraComLetra(letra) {
      return loadVerbetes().then(function(v) {
        return v.verbetes.filter(function(el){return el.lower[0] == letra})
      });
    }

    /**
     * Seleciona todos os verbetes
     * @return {Promise<Array<Verbete>>}
     */
    function verbetes() {
      return loadVerbetes().then(function(v){
        return v.verbetes;
      });
    }

    /**
     * Seleciona o verbete com id especificado
     * @param  {int} id   Id do verbete
     * @return {Promise<Verbete>}
     */
    function verbeteComID(id) {
      return loadVerbetes().then(function(v) {
        return v.mapa[id+""]
      });
    }

    function loadVerbetes() {
      return $http.get('data/diciomane.json')
        .then(function(res){
          var verbetes = res.data
          var mapa = {}

          for(var i=0; i< verbetes.length; i++) {
            verbetes[i].lower = verbetes[i].verbete.toLowerCase()
            mapa[verbetes[i].id+'']= verbetes[i];
          }

          return {verbetes: verbetes, mapa:mapa}
        })
    }

    return {
      verbetes: verbetes,
      verbetesComLetra: filtraComLetra,
      verbeteComID: verbeteComID
    }
  }]);
