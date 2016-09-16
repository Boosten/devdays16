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
      this.$get = function ($log, $http) {

        function getEvent() {
          return $http.get(BASE_URL + '/events', {params: {'companyCode': COMPANY_GUID}})
              .then(function (response) {
                // get the event with the specific ID
                return response.data.filter(function (obj) {
                  return obj.id === EVENT_ID;
                })[0];
              });
        }

        //return the public API
        return {
          getEvent: getEvent
        };
      };
    });

