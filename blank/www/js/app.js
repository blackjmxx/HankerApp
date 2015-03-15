// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
/*var scripts = document.getElementsByTagName("script"),
    currentScriptPath = scripts[scripts.length-1].src;*/

angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    
    }
  });
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
    }]);