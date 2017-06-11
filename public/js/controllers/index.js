/*
 * IndexController
 * author:sgm
 */

define('controllers/index',['mcustomscrollbar'], function (mcustomscrollbar) {

    var  IndexController=['$scope','$rootScope','$http', function($scope,$rootScope,$http) {
        $scope.title = 'Login';
        $rootScope.title= 'TTMS';
        $http.get("/movie").success(function (data) {
						$scope.movies = data;
					}).error(function (data, status, headers, config) {
						alert(status);
					}); 

    }];
    return IndexController;
});