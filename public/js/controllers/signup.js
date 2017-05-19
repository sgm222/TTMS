/*
 *  SignUpController
 *  author:sgm
 */
define('controllers/signup',[], function () {
    var SignUpController = ["$scope", "$rootScope", "$http", "$location", function ($scope, $rootScope, $http, $location) {
        $rootScope.title = "SignUp";
        $scope.user = {
            name:'',
            password:'',
            repeatpassword:'',
            flag:''
        };

        $scope.createClick = function () {
            $http.post('/signup', $scope.user).success(function (data) {
                if (data.err) {
                    return $scope.err = data.err;
                }
                $location.path("/");
            });
        };
    }];
    return SignUpController;
});
