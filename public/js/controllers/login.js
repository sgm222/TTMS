/*
 *  LoginController
 *  author:sgm
 */

 define('controllers/login',[], function () {
    var LoginController = ["$scope", "$rootScope", "$http", "$location",
        function ($scope, $rootScope, $http, $location) {
            $rootScope.title = 'Login';
            $scope.user = {
                name:'',
                password:'',
                flag:''
            };
            $scope.login = function () {
                $http.post('/login', $scope.user).success(function (data) {
                    if (data.err) {
                        return $scope.err = data.err;
                    }
                    localStorage.setItem("user",JSON.stringify($scope.user));
                    $scope.$parent.resetLogin(data);
                    if($scope.user.flag=="admin")
                        $location.path("/admin");
                    else
                        $location.path("/");
                });
            };
            $scope.register = function () {   
                window.location.hash = "/signup";
            };
        }];
        return LoginController;
});
