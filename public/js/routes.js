
define('routes',['app', 'controllers/index', 'controllers/login', 'controllers/logout', 'controllers/signup', 'controllers/movie','controllers/cenima', 'controllers/moviedirection', 'controllers/cenimamovie', "controllers/setcharts", "controllers/adminmovie","controllers/admincenima","controllers/adminplay","controllers/adminticket","controllers/person"],
    function (app, index, login, logout, singnup, movie, cenima, moviedirection, cenimamovie, setcharts, adminmovie, admincenima, adminplay, adminticket, person) {

        return app.config(['$routeProvider', '$locationProvider', "$httpProvider",function ($routeProvider, $locationProvider,$httpProvider) {
            $routeProvider.
                when('/', {templateUrl:'view/index.html', controller:index}).
                when('/login', {templateUrl:'view/login.html', controller:login}).
                when('/logout', {templateUrl:'view/logout.html', controller:logout}).
                when('/signup', {templateUrl:'view/signup.html', controller:singnup}).
                when('/movie', {templateUrl:'view/movie.html', controller:movie}).
                when('/cenima', {templateUrl:'view/cenima.html', controller:cenima}).
                when('/moviedirection', {templateUrl:"view/moviedirection.html", controller:moviedirection}).
                when('/cenimamovie', {templateUrl:"view/cenimamovie.html", controller:cenimamovie}).
                when('/setcharts', {templateUrl:"view/setcharts.html", controller:setcharts}).
                when('/adminmovie', {templateUrl:"admin/adminmovie.html", controller:adminmovie}).
                when('/admincenima', {templateUrl:"admin/admincenima.html", controller:admincenima}).
                when('/adminplay', {templateUrl:"admin/adminplay.html", controller:adminplay}).
                when('/adminticket', {templateUrl:"admin/adminticket.html", controller:adminticket}).
                when('/person', {templateUrl:"view/person.html", controller:person}).
                when('/admin', {templateUrl:"admin/admin.html"}).
                otherwise({redirectTo:'/'});
            $httpProvider.defaults.transformRequest = function(obj){  
             var str = [];  
             for(var p in obj){  
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
             }  
             return str.join("&");  
            }  

           $httpProvider.defaults.headers.post = {  
                'Content-Type': 'application/x-www-form-urlencoded'  
           }  

        }]);
    }); 