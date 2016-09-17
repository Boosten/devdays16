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

      if ($stateParams.day == "friday") {
        vm.day = "vrijdag"
      } else if ($stateParams.day == "saturday") {
        vm.day = "zaterdag"
      }

      vm.sessions = [];

      DevDaysService.getEvent()
          .then(function (response) {
            vm.sessions = response.sessions;

            vm.todaySessions = [];

            vm.fridaySessions = [];
            vm.saturdaySessions = [];

            vm.sessions.forEach(function (session) {
              var startDate = new Date(session.startTime);
              var endDate = new Date(session.endTime);

              session.startTimeInFormat = startDate.getHours() + ":" + startDate.getMinutes() + " - " + endDate.getHours() + ":" + endDate.getMinutes();

              if (startDate.getDay() == 5) { // FRIDAY
                vm.fridaySessions.push(session);
              } else if (startDate.getDay() == 6) { // SATURDAY
                vm.saturdaySessions.push(session);
              } else {
                console.error("EVENT IS NOT ON FRIDAY OR SATURDAY? ", session);
              }
            });

            if ($stateParams.day == "friday") {
              vm.todaySessions = vm.fridaySessions;
            } else if ($stateParams.day == "saturday") {
              vm.todaySessions = vm.saturdaySessions;
            }

          })
          .catch(function (error) {
            $log.error('GetEvents error: ', error);
          });

    })

    .controller('InformatieCtrl', function ($scope, $stateParams) {
    })

    .controller('AgendaItemCtrl', function ($scope, $stateParams, DevDaysService, $log) {

      var vm = this;

      DevDaysService.getEvent()
          .then(function (response) {
            vm.sessions = response.sessions;

            vm.sessions.forEach(function(session) {
              if (session.id == $stateParams.itemId) {
                vm.agendaItem = session;
              }
            })

          })
          .catch(function (error) {
            $log.error('GetEvents error: ', error);
          });

      console.log($stateParams);

    });