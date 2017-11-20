function DatabaseSvc($cordovaSQLite, $localStorage, $ionicPlatform, $q){
  var self = this;
  var _categories = null;

  defferedTransactions = []



  self.init = function init() {
    self.db = window.sqlitePlugin.openDatabase( {name: "dicionariomane.db",
        createFromLocation: 1,
        location: 'default'})

    defferedTransactions.forEach(performTransaction);

    defferedTransactions = [];
  }

  $ionicPlatform.ready(function() {
    self.init();
  })


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

  this.queryMany = performQuery

  this.queryOne = function(query, params) {
    return performQuery(query, params).then(function(res) {
      return res[0]
    })
  }


}

DatabaseSvc.$inject = ['$cordovaSQLite', '$localStorage', '$ionicPlatform', '$q']

angular.module('diciomane.svc.database', [])
  .service('DatabaseSvc', DatabaseSvc)
