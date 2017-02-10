'use strict'

function DictionarySvc($q, db) {
  this.categories = function categories() {
    if (_categories) return $q.resolve(_categories)

    return db.queryMany("SELECT * FROM Categories")
      .then(function qRes(res) {
        _categories = res;
        return _categories;
      })
  }

  this.searchEntries = function(subs) {
    return db.queryMany("SELECT * FROM Entries WHERE search LIKE \'%"+subs+"%\'")
  }

  this.entriesStartingWith = function(letter) {
//    var query = "SELECT * FROM Entries WHERE search LIKE \'"+letter+"%\'";
    return db.queryMany("SELECT * FROM Entries WHERE search LIKE \'"+letter+"%\'")
  }

  this.entryWithID = function(id) {
    return db.queryOne("SELECT * FROM Entries WHERE id=?", [id])
  }

  this.entriesForCategory = function(letter, categoryID) {
//    var query = "SELECT e.* FROM Entries as e JOIN EntryCategory as ec on e.id=ec.entry WHERE ec.category=?"
    return db.queryMany("SELECT e.* FROM Entries as e JOIN EntryCategory as ec on e.id=ec.entry WHERE search LIKE \'"+letter+"%\' AND ec.category=?", [categoryID])
  }

  this.allEntries = function() {
    return db.queryMany("SELECT * FROM Entries")
  }

}

DictionarySvc.$inject = ['$q', 'DatabaseSvc'];

angular.module('diciomane.svc.dictionary', [])
  .service('DictionarySvc', DictionarySvc);
