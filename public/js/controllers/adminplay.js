/*
  *	AddmovieController
  *	author:sgm
 */
define('controllers/adminplay',[], function () {
    var AdminplayController=["$scope","$http","$location",function ($scope, $http, $location){ 
				$scope.plays = [];
				$scope.cenimas = [];
				$scope.halls = [];
				$scope.movies = [];
				$http.get("/play").success(function (data) {
						$scope.plays = data;
					}).error(function (data, status, headers, config) {
						alert(status);
					});
				$http.get("/cenima").success(function (data) {
						$scope.cenimas = data;
					}).error(function (data, status, headers, config) {
						alert(status);
					});
				$http.get("/movie").success(function (data) {
						$scope.movies = data;
					}).error(function (data, status, headers, config) {
						alert(status);
					});
				// $http.get("/hall").success(function (data) {
				// 		$scope.halls = data;
				// 	}).error(function (data, status, headers, config) {
				// 		alert(status);
				// 	});
				$scope.save = function() {
					if(checkAll()){
						$http({
								url: "/addplay",
								data: $scope.play,
								headers: {'Content-Type': 'application/x-www-form-urlencoded'},
								method: $scope.play.id ? "put" : "post"
							})
							.success(function(data, status, headers, config) {
								if($scope.play.id) {
									$scope.play=data;
									console.log($scope.movie);
									alert("修改成功");
								} else {
									if (data.err) {
				                        return $scope.err = data.err;
				                    }else{
				                    	$scope.play=data;
										$scope.plays.push(data);
										alert("添加成功");
									}
								}
							})
							.error(function(data, status, headers, config) {
								alert(status);
							});
						}else{
							alert("输入信息有误");
						}
				}

				$scope.edit = function(b) {
					$scope.play = b;
				}
				$scope.clear = function() {
					$scope.play = {};
				}
				$scope.del = function(id) {
					$http.delete("/delplay",{params: {id:id}}).success(function(data, status, headers, config) {
							$scope.plays.splice(id-1, 1);
						})
						.error(function(data, status, headers, config) {
							alert(status);
						});
					}
				$scope.change=function(){
					$http.get("/cenimahall",{params: {id:$scope.play.cenima_id}}).success(function (data, status, headers, config) {
							$scope.halls = data;
						})
						.error(function (data, status, headers, config) {
							alert(status);
						});
				}
		}];
		return AdminplayController;
});