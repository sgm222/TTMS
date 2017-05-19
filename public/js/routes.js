
define('routes',['app', 'controllers/index', 'controllers/login', 'controllers/logout', 'controllers/signup', 'controllers/movie'],
    function (app, index, login, logout, singnup, movie) {

        return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider.
                when('/', {templateUrl:'view/index.html', controller:index}).
                when('/login', {templateUrl:'view/login.html', controller:login}).
                when('/logout', {templateUrl:'view/logout.html', controller:logout}).
                when('/signup', {templateUrl:'view/signup.html', controller:singnup}).
                when('/movie', {templateUrl:'view/movie.html', controller:movie}).
                otherwise({redirectTo:'/'});
        }]);
    });