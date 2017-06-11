/*
  *	AddmovieController
  *	author:sgm
 */
define('controllers/adminmovie',[], function () {
    var AdminmovieController=["$scope","$http","$location",function ($scope, $http, $location){ 
				$scope.movies = [];
				$http.get("/movie").success(function (data) {
						$scope.movies = data;
					}).error(function (data, status, headers, config) {
						alert(status);
					});
				$scope.save = function() {
					if(checkAll()){
						$http({
								url: "/addmovie",
								data: $scope.movie,
								headers: {'Content-Type': 'application/x-www-form-urlencoded'},
								method: $scope.movie.id ? "put" : "post"
							})
							.success(function(data, status, headers, config) {
								if($scope.movie.id) {
									$scope.movie=data;
									console.log($scope.movie);
									alert("修改成功");
								} else {
									if (data.err) {
				                        return $scope.err = data.err;
				                    }else{
										$scope.movies.push(data);
										$location.path('/adminmovie');
										alert("添加成功");
									}
								}
							})
							.error(function(data, status, headers, config) {
								alert(status);
							});
						}else{
							alert("信息输入有误");
						}
				}

				$scope.edit = function(b) {
					$scope.movie = b;
				}
				$scope.clear = function() {
					$scope.movie = {};
				}
				$scope.del = function(id) {
					$http.delete("/delmovie",{params: {id:id}}).success(function(data, status, headers, config) {
							$scope.movies.splice(id-1, 1);
						})
						.error(function(data, status, headers, config) {
							alert(status);
						});
					}
		}];
		return AdminmovieController;
});