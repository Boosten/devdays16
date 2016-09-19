// http://qnh-events.azurewebsites.net/api/events?companyCode=C116B1BF-C4B8-4EC4-B34A-0988B99CB2257
// http://qnh-events.azurewebsites.net/api/Events?companyCode=C116B1BF-C4B8-4EC4-B34A-0988B99CB225
angular.module('devdays.api', [])
    .provider('DevDaysService', function () {
      var EVENT_ID,
          COMPANY_GUID,
          BASE_URL = '';

      // App Config phase configurable settings
      this.setBaseUrl = function (url) {
        BASE_URL = url;
        return this;
      };

      this.setEventID = function (eventId) {
        EVENT_ID = eventId;
        return this;
      };

      this.setCompanyGUID = function (guid) {
        COMPANY_GUID = guid;
        return this;
      };

      // Return the actual factory
      // TODO make minifcation safe?
      this.$get = function ($log, $http, $q) {

        // Store our event in here
        var event;

        function getEvent() {
          return $http.get(BASE_URL + '/events', {params: {'companyCode': COMPANY_GUID}})
              .then(function (response) {
                // lalala
                if (response && response.data) {
                  // get the event with the specific ID
                  var filtered = response.data.filter(function (obj) {
                    return obj.id === EVENT_ID;
                  });
                  // check if the specific event exists in our data
                  if (filtered && filtered[0]) {
                    event = filtered[0];
                    return filtered[0];
                  } else {
                    return $q.reject('NO EVENT FOUND WITH ID: ' + EVENT_ID);
                  }
                } else {
                  return $q.reject('NO DATA FOUND');
                }
              });
        }

        function getSessionById(sessionId) {
          // use our cached event
          if (event) {
            return $q.when(getSession()[0]);
          } else {
            //else get it from the server
            return getEvent().then(getSession[0]);
          }

          function getSession() {
            return event.sessions.filter(function (session) {
              return session.id == sessionId;
            });
          }

        }

        //return the public API
        return {
          getEvent: getEvent,
          getSessionById: getSessionById
        };
      };
    });

