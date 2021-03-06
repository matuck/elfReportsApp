module.controller('ChildrenController', function($scope, $http, Authentication, $rootScope, Children, Item, Notes, $window){
  $scope.authentication = Authentication;

  // Find a list of Children
  $scope.getChildren = function() {
    $scope.children = Children.query();
  };

  $scope.find = function() {
    $scope.children = Children.query();
  };

  $scope.remove = function( child ) {
    if ( child ) { child.$remove();

      for (var i in $scope.children ) {
        if ($scope.children [i] === child ) {
          $scope.children.splice(i, 1);
        }
      }
      $scope.myNavigator.resetToPage('templates/children.html');
    } else {
      $scope.child.$remove(function() {
        $scope.myNavigator.resetToPage('templates/children.html');
      });
    }
  };

  $scope.addchild = function() {
    // Create new Child object
    var child = new Children ({
      name: this.name
    });

    // Redirect after save
    child.$save(function(response) {
      $scope.myNavigator.resetToPage('templates/children.html');

      // Clear form fields
      $scope.name = '';
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

  // Find existing Child
  $scope.findOne = function() {
    $scope.child = Children.get({
      childId: $scope.myNavigator.getCurrentPage().options.child._id
    });
  };

  $scope.removeitem = function(item) {
    var item2 = new Item(item);

    item2.$remove(function(response) {
      $scope.child = response;
    });
  };

  $scope.additem = function() {
    /*var item = {
      name: this.item,
      child: $scope.child._id
    };*/
    var child = $scope.child ;
    // Create new Item object
    var item = new Item ({
      name: this.item,
      child: child._id
    });

    // Redirect after save
    item.$save(function(response) {
      //load the child back into the scope.
      $scope.child = response;
      // Clear form fields
      $scope.item = '';
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

  $scope.addnote = function () {
    var child = $scope.child;
    var note = new Notes({
      text: this.note,
      good: this.good,
      child: child._id
    });
    if(note.good === '') { note.good = false; }
    if(note.text !== '' && note.text !== undefined) {
      note.$save(function (response) {
        //load child back into scope
        $scope.child = response;
        //clear the form
        $scope.note = '';
        $scope.good = '';
      });
    }
  };

  $scope.removenote = function (note) {
    var note2 = new Notes(note);
    note2.$remove(function(response) {
      $scope.child = response;
    });
  };

  $scope.updatenote = function() {
    var note = new Notes($scope.note);

    note.$update(function() {
      $rootScope.childid = note.child;
      $scope.myNavigator.popPage();
      delete $rootScope.note;
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

  $scope.editnote = function (note) {
    $scope.myNavigator.pushPage('templates/note.html');
    $rootScope.note = note;
  };

  $scope.changePercent = function(child) {
    if(Authentication.isElfSignedin() === false) {
      $scope.myNavigator.resetToPage('templates/entry.html');
    } else {
      child.percent = this.child.percent;
      child.$update(function(response) {
        //$location.path('children/' + child._id);s
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }
  };

  $scope.amazonlink = function(item) {
    var url = 'http://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=' + item.name + '&tag=elfreports-20';
    $window.open(url, '_system');
  };
});
