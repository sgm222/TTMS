/*
  *	PersonController
  *	author:sgm
 */
define('controllers/person',[], function () {
    var AdminticketController=["$scope","$http","$location",function ($scope, $http, $location){ 
				$scope.ticket=[];
				var user=JSON.parse(localStorage.getItem("user"));
				$http.get("/ticketname",{params:{name:user.name}}).success(function (data) {
							$scope.ticket = data;
				}).error(function (data, status, headers, config) {
							alert(status);
				});
		}];
		return AdminticketController;
});