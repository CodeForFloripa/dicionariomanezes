'use strict'
angular.module('diciomane.svc.dictionary', [])
  .service('DictionarySvc', ['$q', 'DatabaseSvc', function($q, db) {

    return {
      allEntries: db.entries,
      startsWith: db.entriesStartingWith,
      entry: db.entry,
      search: db.search
    }
  }]);
