'use strict'

angular.module('diciomane.pages.dictionary',[])
  .controller('DictionaryCtrl', ['$state', 'DictionarySvc', '$scope', '$location', '$ionicScrollDelegate', function($state, dictionary, $scope, $location, $ionicScrollDelegate) {

  var ctrl = this;
      
  var entries = $scope.entries = [];
  var currentCharCode = 'A'.charCodeAt(0) - 1;
  var itemDividerHeight = 50;
  var entryHeight = 80;
      
  $scope.pageTitle = "<img class='title-image' src='img/logo-bar-dic.png' height='70px' width='360px' style='position: fixed; left: 0; right: 0; margin:0 auto; margin-top:-5px;'/>";
      
  function removeAccents(value) {
    return value
      .replace(/Á/g, 'A')
      .replace(/Â/g, 'A')
      .replace(/É/g, 'E')
      .replace(/Í/g, 'I')
      .replace(/Ó/g, 'O')
      .replace(/Ô/g, 'O')       
      .replace(/Ú/g, 'U');
  }
      
 ctrl.reloadEntries =  function(letter) {
    dictionary.entriesStartingWith(letter).then(function(w){
      w.sort(function(a, b) {
        return a.entry.localeCompare( b.entry ) >= 0 ? 1 : -1;
      })
        
      .forEach(function(list) {
        //Get the first letter of the entry, and if the entry changes, put the letter in the array
        var listCharCode = removeAccents( list.entry.toUpperCase() ).charCodeAt(0);
       
        //We may jump two letters, be sure to put both in
        //(eg if we jump from Adam Bradley to Bob Doe, add both C and D)
        var difference = listCharCode - currentCharCode;
          
        for (var i = 1; i <= difference; i++) {
          addLetter(currentCharCode + i);
        }
          
        currentCharCode = listCharCode;
        entries.push(list);
      });
        

       var temp = {};
       for(i=0; i<w.length; i++){
                 var letterA = removeAccents( w[i].entry.toUpperCase().charAt(0) );
                 if(temp[letterA] == undefined){
                   temp[letterA] = [];
                 }
                 temp[letterA].push( w[i] );
        }
        $scope.alphabet = iterateAlphabet(temp);    
      

      //If names ended before Z, add everything up to Z
      for (var i = currentCharCode + 1; i <= 'Z'.charCodeAt(0); i++) {
       addLetter(i);
      }

      function addLetter(code) {
        var letter = String.fromCharCode(code);
        entries.push({ isLetter: true, letter: letter });
      }
        
      //Letters are shorter, everything else is 52 pixels
      $scope.getItemHeight = function(item) {
        return item.isLetter ? itemDividerHeight : entryHeight;
      };

      $scope.getItemWidth = function(){
        return '100%';
      };
              
    })
  }    
  
  ctrl.reloadEntries('');
 
  ctrl.openEntry = function(word) {
    $state.go('entry', {id: word.id})
  }    
  
  
//  var letterHasMatch = {};
  $scope.getList = function() {
    var letterHasMatch = {};
      
    /*Filter contacts by $scope.search.
      Additionally, filter letters so that they only show if there
      is one or more matching contact */
    return entries.filter(function(item) {
      var itemDoesMatch = !$scope.search || item.isLetter ||  item.entry.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||  item.meaning.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

      //Mark this person's last name letter as 'has a match'
      if (!item.isLetter && itemDoesMatch) {
        var letter = item.entry.charAt(0).toUpperCase();
        letterHasMatch[letter] = true;
      }

      return itemDoesMatch;
    })
    .filter(function(item) {
      //Finally, re-filter all of the letters and take out ones that don't have a match
      if (item.isLetter && !letterHasMatch[item.letter]) {
        return false;
      }
      return true;
    });
  };

  
  $scope.scrollTo = function(recipeeId) {
    var scrollHeight = 0;
    var l = $scope.alphabet.indexOf(recipeeId);
    
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].entry){
          if (removeAccents(entries[i].entry.toUpperCase().charAt(0)) == recipeeId) {
            var temp = scrollHeight+(entries.length/3); // the list is very large. The scroll can not walking by whole list. So we need walking by small peaces on it. In this case, we divided it by 3
            $ionicScrollDelegate.scrollTo(0, temp+(itemDividerHeight*l), false); // walking on 1/3 on list lenght
            $ionicScrollDelegate.scrollTo(0, scrollHeight+(itemDividerHeight*l), false); // final letter value
            break;
          }
          scrollHeight += entryHeight;
    //      console.log( JSON.stringify(entries, null, 4) );
        }
    }
  };
  
  
  //Create alphabet object with letters on entries
  function iterateAlphabet(alphabet) {
     var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    if (Object.keys(alphabet).length != 0) {
       str = '';
       for (var i = 0; i < Object.keys(alphabet).length; i++) {
          str += Object.keys(alphabet)[i];
       }
    }
      
     var numbers = new Array();
     for(var i=0; i<str.length; i++) {
        var nextChar = str.charAt(i);
        numbers.push(nextChar);
     }
     return numbers;
  }
      
}]);