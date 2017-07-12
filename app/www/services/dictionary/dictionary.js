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
    if (letter == '')
      return db.queryMany("SELECT * FROM Entries WHERE search LIKE \'"+letter+"%\'")
    else
      return db.queryMany("SELECT * FROM Entries WHERE search GLOB \'["+letter+"-z]*\'")         
  }

  this.entryWithID = function(id) {
    return db.queryOne("SELECT * FROM Entries WHERE id=?", [id])
  }

  this.entriesForCategory = function(letter, categoryID) {
      if (letter == '')
        return db.queryMany("SELECT e.* FROM Entries as e JOIN EntryCategory as ec on e.id=ec.entry WHERE search LIKE \'"+letter+"%\' AND ec.category=?", [categoryID])
      else
        return db.queryMany("SELECT e.* FROM Entries as e JOIN EntryCategory as ec on e.id=ec.entry WHERE search GLOB \'["+letter+"-z]*\' AND ec.category=?", [categoryID])         
  }
  
  this.countEntries = function(letter, categoryID) {
      var catID = typeof categoryID !== 'undefined' ? categoryID : 0;
 
      if (catID == 0) // none category, but the Dictionary button
        return db.queryOne("SELECT COUNT(*) count FROM Entries WHERE search LIKE \'"+letter+"%\'")
      else
        return db.queryOne("SELECT COUNT(*) count FROM Entries as e JOIN EntryCategory as ec on e.id=ec.entry WHERE search LIKE \'"+letter+"%\' AND ec.category=?", [categoryID])
  }

  this.allEntries = function() {
    return db.queryMany("SELECT * FROM Entries")
  }
  
  this.isFavorite = function(idEntry) {  
    return db.queryOne("SELECT COUNT(*) count FROM entryCategory as ec WHERE ec.category=1 AND ec.entry=?", [idEntry])
  }
  
  this.addFavorite = function(idEntry) {
      var favCategory = 1; // ID Favorite category
      db.queryOne("INSERT INTO EntryCategory (category, entry) VALUES (?, ?)", [favCategory, idEntry])
  }
  
  this.delFavorite = function(idEntry) {
      db.queryOne("DELETE FROM EntryCategory WHERE EntryCategory.category=1 AND EntryCategory.entry=?", [idEntry])
  }
  
//  this.delAllFavorite = function() {
//      db.queryOne("DELETE FROM EntryCategory WHERE EntryCategory.category=1")
//  }

}

DictionarySvc.$inject = ['$q', 'DatabaseSvc'];

angular.module('diciomane.svc.dictionary', [])
  .service('DictionarySvc', DictionarySvc);
