
function DatabaseSvc($cordovaSQLite, $localStorage, $ionicPlatform, $q){
  var self = this;
  var _categories = null;

  defferedTransactions = []


  $ionicPlatform.ready(function() {
    self.init();
  })

  self.init = function init() {
    self.db = window.sqlitePlugin.openDatabase( {name: "dicionariomane.db",
        createFromLocation: 1,
        location: 'default'})

    defferedTransactions.forEach(performTransaction);

    defferedTransactions = [];
  }

  function performTransaction(transaction) {
    $cordovaSQLite.execute(self.db, transaction.query, transaction.params)
          .then(function(res) {
            transaction.promise.resolve(extractItems(res))
          }, function(err) {
            transaction.promise.reject(err)
          })
  }


  function performQuery(query, params) {

    var deferred = $q.defer();

    var transaction = {
      'query': query,
      'params': params,
      'promise': deferred
    }

    if(self.db != null)
      performTransaction(transaction)
    else
      defferedTransactions.push(transaction);

    return deferred.promise
  }

  function extractItems(res) {
    var nElements = res.rows.length;
    var c = [];

    for (i=0; i<nElements; i++)
      c.push(res.rows.item(i))

    return c;
  }

  this.categories = function categories() {
    if (_categories) return $q.resolve(_categories)

    return performQuery("SELECT * FROM Categories")
      .then(function qRes(res) {
        _categories = res;
        return _categories;
      })
  }

  this.searchEntries = function(subs) {
    return performQuery("SELECT * FROM Entries WHERE search LIKE \'%"+subs+"%\'")
  }

  this.entriesStartingWith = function(letter) {
    var q = "SELECT * FROM Entries WHERE search LIKE \'"+letter+"%\'";
    return performQuery(q)
  }

  this.entry = function(id) {
    return performQuery("SELECT * FROM Entries WHERE id=?", [id])
      .then(function qRes(res) {
        return res[0];
      })
  }

  this.categoryEntries = function(categoryID) {
    query = "SELECT e.* FROM Entries as e JOIN EntryCategory as ec on e.id=ec.entry WHERE ec.category=?"
    return performQuery(query, [categoryID])
  }

  this.entries = function() {
    return performQuery("SELECT * FROM Entries")
  }

}

DatabaseSvc.$inject = ['$cordovaSQLite', '$localStorage', '$ionicPlatform', '$q']

angular.module('diciomane.svc.database', [])
  .service('DatabaseSvc', DatabaseSvc)
