/*
  *	MovieController
  *	author:sgm
 */
define('controllers/movie',[], function () {
    var MovieController=["$scope","$http",function ($scope, $http){ 
				$scope.movie = [];
				$http.get("/movie").success(function (data) {
						$scope.movie = data;
					}).error(function (data, status, headers, config) {
						alert(status);
					});
				$scope.edit = function(b) {
					$scope.movie = b;
				}
				$scope.clear = function() {
					$scope.movie = {};
				}
		}];
		return MovieController;
});