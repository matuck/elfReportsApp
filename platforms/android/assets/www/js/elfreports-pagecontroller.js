module.controller('PageController', function($scope, $http, Authentication, $window, $rootScope){
  $scope.authentication = Authentication;

  $scope.entryinit = function() {
    var token = window.localStorage.getItem('token');
    if(token !== undefined && token !== '' && token !== null) {
      $scope.myNavigator.resetToPage('templates/children.html');
    }
  };
  $scope.setPageTitle = function(title) {
    $rootScope.pagetitle = title;
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
  $scope.openlink = function(link) {
    $window.open(link, '_system');
  };
});
