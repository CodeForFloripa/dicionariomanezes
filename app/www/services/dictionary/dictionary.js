'use strict'
angular.module('diciomane.svc.dictionary', [])
  .service('DictionarySvc', ['$http', function($http) {

    /**
     * List of dictionary entries
     * @type {Array} of entries
     */
    var _entries = []
    var _entryMap = {}

    /**
     * Finds entries that start with a specific letter
     * @param  {string} letter initial letter
     * @return {Promise<Array<Entry>>}
     */
    function startsWith(letter) {
      return loadEntries().then(function(v) {
        return v.entries.filter(function(el){return el.lower[0] == letter})
      });
    }

    /**
     * Select all dictionary entries
     * @return {Promise<Array<Entry>>}
     */
    function entries() {
      return loadEntries().then(function(v){
        return v.entries;
      });
    }

    /**
     * Select an entry specified by an id
     * @param  {int} id   The id of the entry
     * @return {Promise<Entry>}
     */
    function entry(id) {
      return loadEntries().then(function(v) {
        return v.entryMap[id+""]
      });
    }


    /**
     * Loads internally the entries to be displayed
     * @return {[type]} [description]
     */
    function loadEntries() {
      return $http.get('data/diciomane.json')
        .then(function(res){
          var entries = res.data;
          var entrymap = {};

          var l = entries.length;

          for(var i=0; i< l; i++) {
            entries[i].lower = entries[i].entry.toLowerCase()
            entrymap[entries[i].id+'']= entries[i];
          }

          return {entries: entries, entryMap: entrymap}
        })
    }

    return {
      allEntries: entries,
      startsWith: startsWith,
      entry: entry
    }
  }]);
