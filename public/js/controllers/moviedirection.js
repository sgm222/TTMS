/*
  *	MovieController
  *	author:sgm
 */
define('controllers/moviedirection',[], function () {
    var MoviedirectionController=["$scope","$http","$rootScope","$location",function ($scope, $http, $rootScope, $location){ 
			$scope.movie = [];
			$scope.play= [];
			$scope.movie_id=localStorage.getItem('movie_id');
			$http.get("/moviedirection",{params: {id:$scope.movie_id}}).success(function (data) {
					$scope.movie = data;
					console.log($scope.movie);
				}).error(function (data, status, headers, config) {
					alert(status);
				});	
			$http.get("/moviecenima",{params: {id:$scope.movie_id}}).success(function (data) {
					$scope.play = data;
				}).error(function (data, status, headers, config) {
					alert(status);
				});	
			$scope.turnto=function(cid,hid,price,mid){
					localStorage.setItem("cid",cid);
					localStorage.setItem("hid",hid);
					localStorage.setItem("price",price);
					localStorage.setItem("mid",mid);
                	$location.path('/setcharts');  				
                } 		
		}];
		return MoviedirectionController;
});