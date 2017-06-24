
var app=angular.module('contactApp',[]);

// CONTROLLER
app.controller('ContactCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
  $http.get('script/contacts.json').then(function (resp) {
    $scope.items = resp.data.items;
    $scope.item = $filter('orderBy')($scope.items, 'first')[0];
    $scope.item.selected = true;
  });
  $scope.selectItem = function(item){
    angular.forEach($scope.items, function(item) {
      item.selected = false;
      item.editing = false;
    });
    $scope.item = item;
      $scope.item.selected = true;
  };
  $scope.deleteItem = function(item){
        $scope.items.splice($scope.items.indexOf(item), 1);
  };

  $scope.createItem = function(){
    var item = {};
    $scope.items.push(item);
    $scope.selectItem(item);
    $scope.item.editing = true;
  };

  $scope.editItem = function(item){
      item.editing = true;
  };

  $scope.doneEditing = function(item){
    item.editing = false;
  };

}]);