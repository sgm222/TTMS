/*
 *  LogoutController
 *  author:sgm
 */

define('controllers/logout',[], function () {
var LogoutController = ["$scope", "$rootScope", "$http", "$location",
    function ($scope, $rootScope, $http, $location) {
        $rootScope.title ='logout';
        $http.get('/logout').success(function () {
            $scope.$parent.resetLogin({});
            $location.path("/");
        });
    }];
    return LogoutController;
});
