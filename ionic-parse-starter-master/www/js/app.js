// Ionic Parse Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ionicParseApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ionicParseApp.controllers' is found in controllers.js
var scripts = document.getElementsByTagName("script"),
    currentScriptPath = scripts[scripts.length-1].src;

angular.module('ionicParseApp',
        [ 'ionic', 'ionicParseApp.controllers','ngCordova' ]
    )
    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('welcome', {
                url: '/welcome?clear',
                templateUrl: 'templates/welcome.html',
                controller: 'WelcomeController'
            })

           /* .state('app', {
                url: '/app?clear',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppController'
            })*/

            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeController'

            })

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'

            })

            .state('forgot', {
                url: '/forgot',
                templateUrl: 'templates/forgotPassword.html',
                controller: 'ForgotPasswordController'

            })

            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'RegisterController'
            });

        $urlRouterProvider.otherwise('/welcome');
    })
    .run(function ($state, $rootScope,$cordovaSQLite) {
        Parse.initialize('BETbnW9QyaImIt1DPrJfkzrTuLTpUnrpqwqv9J79', 'QDWDu91XllP2FdIUhE7kmlnX3VGTDpTjX3dx6kzE');
        var currentUser = Parse.User.current();
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;

        if (currentUser) {
            $rootScope.user = currentUser;
            $rootScope.isLoggedIn = true;
            /*db = window.openDatabase("my.db", "1.0", "My app", -1);
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");*/
            $state.go('home');
        }
    })
.directive('ionRadialProgress', ['$timeout', function($timeout) {
      return {
        restrict: 'E',
        transclue: true,
        replace: true,
        scope: {
          timer: '=',
          color: '=?',
          backgroundColor: '=?'
        },
        link: function (scope) {
          scope.color = scope.color || "#000000";
          scope.backgroundColor = scope.backgroundColor || "white";
        },
        controller: function ($scope) {
          $scope.seconds = $scope.timer;

          $scope.gt50 = function () {
            return $scope.seconds > ($scope.timer/2);
          };

          function countdown() {
            function tick() {
              $scope.seconds--;

              // Calculate the amount of circle to fill in
              $scope.deg = 360*($scope.seconds/$scope.timer);

              // Are we done?
              if( $scope.seconds > 0 ) {
                setTimeout(tick, 1000);
              } else {
                //done
              }

              // Make sure we don't call $apply() at the wrong time
              $timeout(function() {
                $scope.$apply();
              });
            }
            tick();
          }

          // start the countdown
          countdown();
        },
        templateUrl:currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1) + '../partials/ion-radial-progress.html'
      };
    }])
.directive('myTest',function(){
    return{
        templateUrl:currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/') + 1) + '../partials/test.html'
    }
});

