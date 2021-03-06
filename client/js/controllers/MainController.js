angular.module('ff.controllers').controller('MainController', function($scope, Feed, TwitterCheck, InstagramCheck, $timeout) {
  $scope.twitterCheckShow = false;          // Hides check mark until we're authorized
  $scope.instagramCheckShow = false;        // Hides check mark until we're authorized
  
  $scope.processSearch = function(query) {
    Feed.setQuery(query);
    Feed.setDataExists(true);
  }; 
  
  $scope.checkAuths = function(){
    
    TwitterCheck.checkAuth()                 // Sends GET req to backend to check sessions auth for Twitter
      .then(function(result){
        if ( result.data === true ) {
          $scope.twitterCheckShow = true;    // If we have a Twitter is authorized, show check mark
        }
      })
      .catch(function( err ) {
        console.error(err);
      });
    
    InstagramCheck.checkAuth()                // Sends GET req to backend to check sessions auth for Instagram
      .then(function(result){
        if ( result.data === true ) {
          $scope.instagramCheckShow = true;   // If we have a Instagram is authorized, show check mark
        }
      })
      .catch(function( err ) {
        console.error(err);
      });
      
  }();    // Invoke this function on page load

  $scope.$watch(function() {
    return Feed.getDataExists();
  }, function(newVal, oldVal) {
    if (newVal === false) {
      $scope.dataExists = false;
    }
  });

});