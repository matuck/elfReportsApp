module.controller('UserController', function($scope, $http, Authentication){
  $scope.authentication = Authentication;
  $scope.signup = function() {
    $http({
      url: apiurl + "/auth/signup",
      method: "POST",
      data: JSON.stringify($scope.credentials),
      headers: {'Content-Type': 'application/json'}
    }).success(function (data, status, headers, config) {
      $scope.authentication.user = data.user;
      window.localStorage.setItem('token', data.token);
      $scope.menu.setMainPage('templates/children.html', {closeMenu: true});
      $http.defaults.headers.common['x-access-token'] = data.token;
      $http.defaults.headers.common.authorization = data.token;
    }).error(function (data, status, headers, config) {
      $scope.message = data.message;
    });
  };

  $scope.signin = function() {
    $http({
      url: apiurl + "/auth/signin",
      method: "POST",
      data: JSON.stringify($scope.credentials),
      headers: {'Content-Type': 'application/json'}
    }).success(function (data, status, headers, config) {
      $scope.authentication.user = data.user;
      window.localStorage.setItem('token', data.token);
      $http.defaults.headers.common['x-access-token'] = data.token;
      $http.defaults.headers.common.authorization = data.token;
      $scope.menu.setMainPage('templates/children.html', {closeMenu: true});
    }).error(function (data, status, headers, config) {
      $scope.message = data.message;
    });
  };

  $scope.signout = function() {
    window.localStorage.removeItem('token');
    $scope.menu.setMainPage('templates/entry.html', {closeMenu: true});
  };

  $scope.elfsignin = function() {
    $http({
      url: apiurl + "/auth/elfsignin",
      method: "POST",
      data: JSON.stringify($scope.credentials),
      headers: {'Content-Type': 'application/json'}
    }).success(function (data, status, headers, config) {
      window.localStorage.setItem('elfsignintime', data.elfsignintime);
      $scope.menu.setMainPage('templates/children.html', {closeMenu: true});
    }).error(function (data, status, headers, config) {
      $scope.message = data.message;
    });
  };

  $scope.elfsignout = function() {
    $http.get(apiurl + '/auth/elfsignout').success(function(response) {
      window.localStorage.removeItem('elfsignintime');
      $scope.menu.setMainPage('templates/children.html', {closeMenu: true});
    }).error(function(response) {
      console.log('failure');
    });
  };
});
