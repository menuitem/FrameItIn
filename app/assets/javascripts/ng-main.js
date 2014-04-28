angular.module('myApp', ['ngRoute','ngAnimate']) 
.config(function($routeProvider) {
  $routeProvider
    .when('/uploads/:uploadId', {
      controller:'uploadController'
    });
})
.controller('uploadController',['$scope','$http','$routeParams','$location',function($scope,$http,$routeParams,$location) {
  var id = $location.$$absUrl.split('/').pop();
  // why $routeParams.uploadId is undefined
  // console.log("$location ", $location)
  // console.log("$location ", id)
  // console.log("$location ", $routeParams)
  $http({method: 'GET', url: '/uploads/' +id+'.json'}).
    success(function(data, status, headers, config) {
    $scope.pictures = data;
  }).error(function(data, status) {
  });
}]);
 