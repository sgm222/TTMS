/*
 * IndexController
 * author:sgm
 */

define('controllers/index',['mcustomscrollbar'], function (mcustomscrollbar) {

    var  IndexController=['$scope','$rootScope',function($scope,$rootScope) {
        $scope.title = 'Login';
        $rootScope.title= 'TTMS';
    }];
    return IndexController;
});