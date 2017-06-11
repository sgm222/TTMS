/*
  *	AddmovieController
  *	author:sgm
 */
define('controllers/adminticket',[], function () {
    var AdminticketController=["$scope","$http","$location",function ($scope, $http, $location){ 
				$scope.ticket=[];
				$scope.tickets = [];
				$scope.select="全部";
				$scope.total = 0;
				$scope.span="总销售额:";
				$http.get("/ticket").success(function (data) {
						$scope.ticket = data;
						$scope.tickets = data;
						for(var i=0;i<data.length;i++)
							$scope.total+=data[i].movie_price;
					}).error(function (data, status, headers, config) {
						alert(status);
					});
				$scope.change=function(){					
					if($scope.select == "全部")
					{
						$scope.span="总销售额:";
						$scope.total = 0;
						$http.get("/ticket").success(function (data) {
							$scope.ticket = data;
							for(var i=0;i<data.length;i++)
								$scope.total+=data[i].movie_price;
							console.log($scope.total);
						}).error(function (data, status, headers, config) {
							alert(status);
						});
						
					}else{
						$http.get("/ticketdate",{params: {date:$scope.select}}).success(function (data) {
							$scope.span="日销售额:";
							$scope.ticket = data;
							$scope.total = 0;
							for(var i=0;i<data.length;i++)
								$scope.total+=data[i].movie_price;
							console.log($scope.total);
						}).error(function (data, status, headers, config) {
							alert(status);
						});
					}
				}
		}];
		return AdminticketController;
});