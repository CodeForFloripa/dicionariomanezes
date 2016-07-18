'use strict'
angular.module('diciomane.svc.dictionary', [])
  .service('DictionarySvc', ['$http', '$q', function($http, $q) {

    var _cached;

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
     * Finds entries that contains a substring (matches part of the entry)
     * @param  {string} word
     * @return {Promise<Array<Entry>>}
     */
    function search(word) {
      return loadEntries().then(function(v) {
        return v.entries.filter(function(el){return (el.entry.indexOf(word) > -1) || (el.meaning.indexOf(word) > -1)})
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

      if (_cached != null)
        return $q.resolve(_cached)

      return $http.get('data/diciomane.json')
        .then(function(res){

          var entries = res.data;
          var entrymap = {};

          var l = entries.length;

          for(var i=0; i< l; i++) {
            entries[i].lower = entries[i].entry.toLowerCase()
            entrymap[entries[i].id+'']= entries[i];
          }

          _cached = {entries: entries, entryMap: entrymap};

          return _cached;
        })
    }

    return {
      allEntries: entries,
      startsWith: startsWith,
      entry: entry,
      search: search
    }
  }]);
