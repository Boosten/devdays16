// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'starter.controllers',
  'devdays.api'])

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

    .config(function ($stateProvider, $urlRouterProvider, DevDaysServiceProvider, $httpProvider) {

      const QNH_EVENTS_URL = 'http://qnh-events.azurewebsites.net';

      /**
       * Check if the app is running on a device before requesting /rest.
       * Prepend the host base url to create an absolute url because on a device the app runs from file:// instead of http://
       * any REST request would then be made to file://...../api/xxx. We have to route this request to the proper endpoint
       */
      $httpProvider.interceptors.push(function ($injector) {
        return {
          request: function (config) {
            if (config && config.url && config.url.indexOf('/api') > -1 && window.cordova && (window.location.protocol === 'file:')) {
              config.url = QNH_EVENTS_URL + config.url;
            }
            return config;
          }
        };
      });

      // Configure our API Service
      DevDaysServiceProvider
          .setBaseUrl('/api')
          .setEventID(7)
          .setCompanyGUID('C116B1BF-C4B8-4EC4-B34A-0988B99CB225');

      $stateProvider
          .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl as vm'
          })
          .state('app.zaterdag', {
            url: '/zaterdag',
            views: {
              'menuContent': {
                templateUrl: 'templates/agenda/agenda.html',
                controller: 'AgendaCtrl as vm'
              }
            }
          })
          .state('app.vrijdag', {
            url: '/vrijdag',
            views: {
              'menuContent': {
                templateUrl: 'templates/agenda/agenda.html',
                controller: 'AgendaCtrl as vm'
              }
            }
          })
          .state('app.informatie', {
            url: '/informatie',
            views: {
              'menuContent': {
                templateUrl: 'templates/informatie/informatie.html',
                controller: 'AgendaCtrl as vm'
              }
            }
          });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/vrijdag');
    });
