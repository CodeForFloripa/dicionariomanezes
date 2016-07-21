angular.module('utils.localstorage', [])
  .factory('$localStorage', ['$window', '$q', function($window, $q) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        var value = $window.localStorage[key];

        return value ? $q.resolve(value) : $q.reject();
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        var value = $window.localStorage[key];

        return value ? $q.resolve(JSON.parse(value)) : $q.reject();
      },
      clear: function() {
        $window.localStorage = {};
      }
    }
  }]);
