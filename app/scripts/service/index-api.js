'use strict';

/**
 * @ngdoc function
 * @name haimaApp.controller:indexApi
 * @description
 * # indexApi
 * factory of the haimaApp
 */

angular.module('haimaApp')
  .factory('LoginApi', function(API_END_POINT, sendRequest) {

    var loginUser = function(username, password, callback) {
      var url = API_END_POINT.url + '/Index/dmsLogin?username=' + username + '&password=' + password;
      var method = 'get';
      var data = {};

      return sendRequest.send(url, method, data, callback);
    };

    return {
      loginUser: loginUser
    };
  })
  .factory('MainApi', function($http, $state, API_END_POINT, sendRequest) {

    var getMenu = function(username, callback) {
      // var url = API_END_POINT.url + '/Index/index';
      // var method = 'post';

      // var url = 'data/menu.json';
      // var method = 'get';
      var url = '/api/Index/index';
      var method = 'post';
      var data = {};
      return sendRequest.send(url, method, data, callback);
    };

    var getIconMateData = function(callback) {
      var url = 'data/icon-mate.json';
      var method = 'get';
      var data = {};

      return sendRequest.send(url, method, data, callback);
    };

    // 登出
    var logout = function(callback) {
      var url = API_END_POINT.url + '/index/logout';
      var method = 'get';
      var data = {};

      return sendRequest.send(url, method, data, callback);
    };

    // 修改密码
    var changePassword = function(data, callback) {
      var url = API_END_POINT.url + '/service/changePassword';
      var method = 'post';

      return sendRequest.send(url, method, data, callback);
    };

    return {
      getMenu: getMenu,
      getIconMateData: getIconMateData,
      logout: logout,
      changePassword: changePassword
    };
  })
  .factory('QueryApi', ['API_END_POINT', 'sendRequest',
    function(API_END_POINT, sendRequest) {

      // 取得查询条件
      var getQueryCondition = function(data, callback) {
        var url = API_END_POINT.url + '/index/query?p=' + data.p;
        var method = 'get';

        return sendRequest.send(url, method, data, callback);
      };

      // 取得报表数据
      var getReportData = function(data, callback) {
        var url = API_END_POINT.url + '/index/report?p=' + data.p + '&dealer_id=' + data.dealerId + '&title=' + data.title;
        // var url = API_END_POINT.url + '/index/report';
        var method = 'post';

        return sendRequest.send(url, method, data, callback);
      };

      return {
        getQueryCondition: getQueryCondition,
        getReportData: getReportData
      };
    }
  ])
  .factory('PublicApi', ['API_END_POINT', 'HAIMA_END_POINT', 'sendRequest',
    function(API_END_POINT, HAIMA_END_POINT, sendRequest) {

      // 取得查询条件
      var getPublicData = function(data, callback) {
        var url = HAIMA_END_POINT.url + data.url;
        var method = 'get';

        return sendRequest.send(url, method, data, callback);
      };

      // 取得dialog内容
      var getDialogContent = function(data, callback) {
        var url = HAIMA_END_POINT.url + data.url;
        var method = 'get';

        return sendRequest.send(url, method, data, callback);
      };

      // 通用打印接口
      var doPrint = function(data, callback) {
        var url = API_END_POINT.url + '/partscommon/doPrint';
        var method = 'post';

        return sendRequest.send(url, method, data, callback);
      };

      return {
        getPublicData: getPublicData,
        getDialogContent: getDialogContent,
        doPrint: doPrint
      };
    }
  ]);
