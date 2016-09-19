// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'starter.controllers',
  'devdays.api',
  'devdays.settings'
])

    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })

    .config(function ($stateProvider, $urlRouterProvider, DevDaysServiceProvider, $httpProvider, APPSETTINGS) {

      // Configure our API Service
      DevDaysServiceProvider
          .setBaseUrl(APPSETTINGS.BASEURL) // this can be a relative url (for use with Ionic serve), or a absolute url for use on an actual device
          .setEventID(7)
          .setCompanyGUID('C116B1BF-C4B8-4EC4-B34A-0988B99CB225');

      $stateProvider
          .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html',
            controller: 'AppCtrl as vm'
          })
          .state('tab.agenda', {
            url: '/agenda',
            views: {
              'tab-agenda': {
                templateUrl: 'templates/agenda/agenda.html',
                controller: 'AgendaCtrl as vm'
              }
            }
          })
          .state('tab.agenda.detail', {
            url: '/:sessionId',
            views: {
              'tab-agenda@tab': {
                templateUrl: 'templates/agenda/detail/detail.html',
                controller: 'DetailController as vm'
              }
            }
          })
          .state('tab.agenda.detail.rating', {
            url: '/mening',
            views: {
              'tab-agenda@tab': {
                templateUrl: 'templates/agenda/detail/rating/rating.html',
                controller: 'RatingController as vm'
              }
            }
          })
          .state('tab.information', {
            url: '/informatie',
            views: {
              'tab-information': {
                templateUrl: 'templates/informatie/informatie.html',
                controller: 'AgendaCtrl as vm'
              }
            }
          });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/tab/agenda');
    });
