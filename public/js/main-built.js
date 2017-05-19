require.config({

    paths: {
        jquery: '../lib/jquery/jquery-1.8.2.min',
        bootstrap: '../lib/bootstrap/js/bootstrap',
        underscore: '../lib/underscore/underscore',
        angular: '../lib/angular/angular',
        angularResource: '../lib/angular/angular-resource',
        text: '../lib/require/text',
        modernizr:'../lib/modernizr',
        html5shiv:'../lib/html5shiv',
        mcore:'../lib/mcore.min',
        fullscreen:'../lib/fullscreen',
        mcustomscrollbar:'../lib/jquery.mCustomScrollbar.concat.min',
        detectbrowser:'../lib/detectbrowser'

    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angular-resource' : {deps:['angular']},
        'bootstrap': {deps:['jquery']},
        'mcustomscrollbar':{deps:['jquery']},
        'underscore': {exports: '_'},
        'detectbrowser':{deps:['modernizr']}

    },
    priority: [
        "angular"
    ],
    urlArgs: 'v=1.0.0.1'
});

require(['angular',
         'app',
         'jquery',
          'fullscreen',
          'mcore',
         'controllers/layout',
         'controllers/index',
         'controllers/movie',
         'directives/compare',
         'routes',
         'detectbrowser'
], function (angular) {
    angular.bootstrap(document, ['app']);
});

define("main", function(){});
