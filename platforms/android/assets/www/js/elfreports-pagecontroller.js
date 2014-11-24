module.controller('PageController', function($scope, $http, Authentication){
  $scope.authentication = Authentication;

  $scope.entryinit = function() {
    var token = window.localStorage.getItem('token');
    if(token !== undefined && token !== '' && token !== null) {
      $scope.menu.setMainPage('templates/children.html', {closeMenu: true});
    }
  };

  $scope.retryconnection = function() {

    $http.get(apiurl).
        success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          window.location = 'index.html';
        }).error(function(data, status, headers, config) {
          console.log(status);
        });
  };
});
