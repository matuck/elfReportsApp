
"use strict";
//var apiurl = 'http://www.elfreports.com';
var apiurl = 'http://127.0.0.1:3000';
var module = angular.module('app', ['onsen', 'ngResource', 'ngTouch']);
module.run(function($http, $rootScope) {
  if(window.localStorage.getItem('token') !== null &&  window.localStorage.getItem('token') !== 'undefined' && window.localStorage.getItem('token') !== '') {
    $http.defaults.headers.common['x-access-token'] = window.localStorage.getItem('token');
    $http.defaults.headers.common.authorization = window.localStorage.getItem('token');
  }


});

module.directive('mytouchend', function() {

  return function(scope, element, attrs) {

    element.bind('touchend click', function(event) {

      event.preventDefault();
      event.stopPropagation();

      scope.$apply(attrs.mytouchend);
      element.unbind();
    });
  };
});

angular.module("app").config(function($httpProvider) {
  $httpProvider.interceptors.push(function($q) {
    return {
      responseError: function(rejection) {
        if(rejection.status === 0) {
          window.location = "noconnection.html";
          return;
        }
        return $q.reject(rejection);
      }
    };
  });
});
// Authentication service for user variables
angular.module('app').factory('Authentication', [

  function() {
    var _this = this;

    _this._data = {
      user: window.user,
      isElfSignedin: function() {
        var expiretime = 10 * 60; //minutes time seconds
        var currtime = new Date().getTime()/1000;
        if (currtime <= (parseInt(window.localStorage.getItem('elfsignintime')) + expiretime)) {
          return true;
        } else {
          return false;
        }
      },
      isSignedIn: function () {
        var token = window.localStorage.getItem('token');
        if(token !== '' && token !== undefined && token !== null) {
          return true;
        } else {
          return false;
        }
      }
    };

    return _this._data;
  }
]);

angular.module('app').factory('Children', ['$resource',
  function($resource) {
    return $resource(apiurl + '/children/:childId', { childId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

//Children service used to communicate Children REST endpoints
angular.module('app').factory('Item', ['$resource',
  function($resource) {
    return $resource(apiurl + '/children/:childId/list/:item', { childId: '@child', item: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

angular.module('app').factory('Notes', ['$resource',
  function($resource) {
    return $resource(apiurl + '/children/:childId/notes/:note', { childId: '@child', note: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
