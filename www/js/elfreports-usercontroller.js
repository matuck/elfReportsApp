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
      window.localStorage.setItem('username', data.user.username);
      window.localStorage.setItem('token', data.token);
      $scope.myNavigator.resetToPage('templates/children.html');
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
      window.localStorage.setItem('username', data.user.username);
      window.localStorage.setItem('token', data.token);
      $http.defaults.headers.common['x-access-token'] = data.token;
      $http.defaults.headers.common.authorization = data.token;
      $scope.myNavigator.resetToPage('templates/children.html');
    }).error(function (data, status, headers, config) {
      $scope.message = data.message;
    });
  };

  // Submit forgotten password account id
  $scope.askForPasswordReset = function() {
    askForPasswordResetToken($scope.credentials.username);
  };
  $scope.askForPasswordResetWithLoggedInUser = function() {
    askForPasswordResetToken(window.localStorage.getItem('username'));
  }
  var askForPasswordResetToken = function(username) {
    $scope.success = $scope.error = null;
    $http.post(apiurl + '/auth/forgot', {username: username}).success(function(response) {
      // Show user success message and clear form
      $scope.credentials = null;
      $scope.success = response.message;

    }).error(function(response) {
      // Show user error message and clear form
      $scope.credentials = null;
      $scope.error = response.message;
    });
  };

  $scope.ChangeUserPassword = function() {
    $scope.success = $scope.error = null;

    $http.post(apiurl + '/users/password', $scope.passwordDetails).success(function(response) {
      // If successful show success message and clear form
      $scope.success = true;
      $scope.passwordDetails = null;

      //logout all users
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('elfsignintime');
    }).error(function(response) {
      $scope.error = response.message;
    });
  };

  $scope.signout = function() {
    window.localStorage.removeItem('token');
    $scope.myNavigator.resetToPage('templates/entry.html');
  };

  $scope.elfsignin = function() {
    $http({
      url: apiurl + "/auth/elfsignin",
      method: "POST",
      data: JSON.stringify($scope.credentials),
      headers: {'Content-Type': 'application/json'}
    }).success(function (data, status, headers, config) {
      window.localStorage.setItem('elfsignintime', data.elfsignintime);
      $scope.myNavigator.resetToPage('templates/children.html');
    }).error(function (data, status, headers, config) {
      $scope.message = data.message;
    });
  };

  $scope.elfsignout = function() {
    $http.get(apiurl + '/auth/elfsignout').success(function(response) {
      window.localStorage.removeItem('elfsignintime');
      $scope.myNavigator.resetToPage('templates/children.html');
    }).error(function(response) {
      console.log('failure');
    });
  };
});
