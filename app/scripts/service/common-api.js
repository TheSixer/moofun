'use strict';

/**
 * @ngdoc function
 * @name haimaApp.controller:CommonApi
 * @description
 * # CommonApi
 * factory of the haimaApp
 */

angular.module('haimaApp')
  .factory('CommonApi', ['API_END_POINT', 'sendRequest',
    function (API_END_POINT, sendRequest) {

      var getCodeMaster = function (callback) {
        var url = 'data/code-master.json';
        var method = 'get';
        var data = {};

        return sendRequest.send(url, method, data, callback);
      };

      return {
        getCodeMaster: getCodeMaster
      };
    }
  ]);
