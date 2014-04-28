angular.module('myApp', ['ngRoute','ngAnimate']) 
.config(function($routeProvider) {
  $routeProvider
    .when('/pictures/:uploadId', {
      controller:'UploadController'
    });
})
.controller('UploadController',['$scope','$http','$routeParams','$location',function($scope,$http,$routeParams,$location) {
  var id = $location.$$absUrl.split('/').pop();
  $http({method: 'GET', url: '/pictures/' +id+'.json'}).
    success(function(data, status, headers, config) {
    $scope.pictures = data;
    $scope.id = id;
  }).error(function(data, status) {
  });
}]).controller('PublicController',['$scope','$http','$routeParams','$location',function($scope,$http,$routeParams,$location) {
  var id = $location.$$absUrl.split('/').pop();
  $http({method: 'GET', url: '/public/' +id+'.json'}).
    success(function(data, status, headers, config) {
    $scope.pictures = data;
    $scope.id = id;
  }).error(function(data, status) {
  });
}])