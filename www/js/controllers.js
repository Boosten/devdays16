angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //$scope.$on('$ionicView.enter', function(e) {
      //});

      // Form data for the login modal

    })

    .controller('AgendaCtrl', function ($scope, $stateParams, DevDaysService, $log) {

      var vm = this;

      DevDaysService.getEvent()
          .then(function (response) {
            // Group our days so we can repeat over it more easily
            vm.days = {
              Vrijdag: getDataByDay(response.sessions, "startTime", 5),
              Zaterdag: getDataByDay(response.sessions, "startTime", 6)
            };
          })
          .catch(function (error) {
            $log.error('GetEvents error: ', error);
          });

      // filter the data by the specified day on the specified key
      function getDataByDay(data, key, day) {
        return data.filter(function (s) {
          return (new Date(s[key])).getDay() === day;
        });
      }
    })

    .controller('InformatieCtrl', function ($scope, $stateParams) {
    })

    .controller('DetailController', function ($scope, $stateParams, DevDaysService, $log) {
      var vm = this;

      DevDaysService.getSessionById($stateParams.sessionId)
          .then(function (response) {
            $log.debug('got session:', response);
            vm.session = response;
          });
    })
    .controller('RatingController', function ($scope, $stateParams, DevDaysService, $log, $state, $window) {
      var vm = this;

      DevDaysService.getSessionById($stateParams.sessionId)
          .then(function (response) {
            $log.debug('got session:', response);
            // Convert array to object. Return last item from array as an object.
            vm.session = response;
          });

      function postRating() {
        var rating = vm.rating;

        DevDaysService
            .postRating(vm.session, rating.speakerRating, rating.sessionRating, rating.comments)
            .then(function (response) {
              if (response.data == true) {
                $window.localStorage[vm.session.id + vm.session.endTime] = 1;
                $state.go('tab.agenda.detail', {
                  sessionId: vm.session.id
                });
              }
            });
      }

      vm.postRating = postRating;
      vm.rating = {
        speakerRating: '3',
        sessionRating: '3',
        comments: ''
      };

    });