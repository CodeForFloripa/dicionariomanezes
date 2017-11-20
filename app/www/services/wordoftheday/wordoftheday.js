angular.module('diciomane.svc.wordoftheday', [])
  .service('WordOfTheDaySvc', ['DictionarySvc', '$localStorage', '$q',
    function(dictionary, $localStorage, $q) {
      return function(date) {
        var key = 'wordofday_' + date.toDateString();
        return $localStorage.getObject(key)
          .then(function(entry) {
            return entry;
          }, function error() {
            return dictionary.allEntries().then(function(entries) {
              return entries[Math.floor(Math.random() * entries.length)];
            });
          }).then(function save(e) {
            $localStorage.setObject(key, e);
            return e;
          })
      }
    }
  ]);
