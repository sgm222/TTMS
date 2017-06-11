/*
 * LayoutController
 * author:sgm
 */
define('controllers/layout',['../app'], function (app) {
    return app.controller('LayoutController', function ($scope, $http) {        
        $http.get('/checklogin').success(function (user) {
            $scope.resetLogin(user);
        });
        $scope.txt = {
            home:'欢迎'
        };
        $scope.resetLogin = function (user) {
            if (user.name) {
                $scope.login = {
                    url:'logout',
                    name:'注销'
                };
      
                if(user.flag == 'admin'){
                     $scope.signup = {
                        url:'admin',
                        name:'welcome:' + user.name
                    }
                }else{
                    $scope.signup = {
                        url:'person',
                        name:'welcome:' + user.name
                    }
                }
            } else {
                $scope.login = {
                    url:'login',
                    name:'登录'
                };
                $scope.signup = {
                    url:'signup',
                    name:'注册'
                };
            }
        };
    });
});