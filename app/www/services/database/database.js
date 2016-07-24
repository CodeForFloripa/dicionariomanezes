
/**
 *
 */
function DatabaseSvc($cordovaSQLite, $localStorage){
  var self = this;

  /**
   *
   */
  this.init = function init() {
    self.db = window.sqlitePlugin.openDatabase( {name: "dicionariomane.db",
        createFromLocation: 1,
        location: 'default'})
  }

  /**
   *
   */
  this.select = function select() {
  }

}

DatabaseSvc.$inject = ['$cordovaSQLite', '$localStorage']

angular.module('diciomane.svc.database', [])
  .service('DatabaseSvc', DatabaseSvc)
