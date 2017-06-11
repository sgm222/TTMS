/*
  *	MovieController
  *	author:sgm
 */
define('controllers/cenimamovie',[], function () {
    var CenimamovieController=["$scope","$http","$rootScope","$location",function ($scope, $http, $rootScope, $location){ 
			$scope.play= [];
			$scope.cenima_id=localStorage.getItem('cenima_id');
			$http.get("/cenimamovie",{params: {id:$scope.cenima_id}}).success(function (data) {
					$scope.play = data;
				}).error(function (data, status, headers, config) {
					alert(status);
				});	
			$scope.turntoo=function(cid,hid,price,mid){
					localStorage.setItem("cid",cid);
					localStorage.setItem("hid",hid);
					localStorage.setItem("price",price);
					localStorage.setItem("mid",mid);
                	$location.path('/setcharts');  				
                } 
            $scope.turnto=function(id){
					localStorage.setItem("movie_id",id);
                	$location.path('/moviedirection');  				
                } 	
		}];
		return  CenimamovieController;
});