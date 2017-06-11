/*
  *	AddcenimaController
  *	author:sgm
 */
define('controllers/admincenima',[], function () {
    var AdmincenimaController=["$scope","$http","$location",function ($scope, $http, $location){ 
				$scope.cenimas = [];
				$scope.halls = [];
				$http.get("/cenima").success(function (data) {
						$scope.cenimas = data;
					}).error(function (data, status, headers, config) {
						alert(status);
					});
				$scope.save = function() {
					if(checkAll()){
						$http({
								url: "/addcenima",
								data: $scope.cenima,
								headers: {'Content-Type': 'application/x-www-form-urlencoded'},
								method: $scope.cenima.id ? "put" : "post"
							})
							.success(function(data, status, headers, config) {
								if($scope.cenima.id) {
									$scope.cenima=data;
									console.log($scope.cenima);
									alert("修改成功");
								} else {
									if (data.err) {
				                        return $scope.err = data.err;
				                    }else{
										$scope.cenimas.push($scope.hall);
					
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
					$scope.cenima = b;
				}
				$scope.clear = function() {
					$scope.cenima = {};
				}
				$scope.del = function(id) {
					$http.delete("/delcenima",{params: {id:id}}).success(function(data, status, headers, config) {
							$scope.cenimas.splice(id-1, 1);
						})
						.error(function(data, status, headers, config) {
							alert(status);
						});
					}

				$scope.gethall = function(id){
					localStorage.setItem("hall_cenima_id",id);
					$http.get("/cenimahall",{params: {id:id}}).success(function (data, status, headers, config) {
							$scope.halls = data;
						})
						.error(function (data, status, headers, config) {
							alert(status);
						});
				}


				$scope.savehall = function() {
					$http({
							url: "/addhall",
							data: $scope.hall,
							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							method: $scope.hall.id ? "put" : "post",
							params:{id:localStorage.getItem("hall_cenima_id")}
						})
						.success(function (data, status, headers, config) {
							if($scope.hall.id) {
								$scope.hall=data;
								console.log($scope.hall);
								alert("修改成功");
							} else {
								if (data.err) {
			                        return $scope.err = data.err;
			                    }else{
									$scope.halls.push(data);
									alert("添加成功");
								}
							}
						})
						.error(function(data, status, headers, config) {
							alert(status);
						});
				}

				$scope.edithall = function(b) {
					$scope.hall = b;
				}
				$scope.clearhall = function() {
					$scope.hall = {};
				}
				$scope.delhall = function(id) {
					$http.delete("/delhall",{params: {id:id}}).success(function(data, status, headers, config) {
							$scope.halls.splice(id-1, 1);
						})
						.error(function(data, status, headers, config) {
							alert(status);
						});
					}
		}];
		return AdmincenimaController;
});