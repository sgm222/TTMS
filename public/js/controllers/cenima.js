/*
  *	CenimaController
  *	author:sgm
 */
define('controllers/cenima',[], function () {
    var CenimaController=["$scope","$http","$location",function ($scope, $http, $location){ 
				$scope.cenima = [];
				$http.get("/cenima").success(function (data) {
						$scope.cenima = data;
					}).error(function (data, status, headers, config) {
						alert(status);
					});
				$scope.turnto=function(id){
					localStorage.setItem("cenima_id",id);
                	$location.path('/cenimamovie');  				
                } 
		}];
		return CenimaController;
});