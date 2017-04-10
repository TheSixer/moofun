'use strict';

/**
 * 登录
 * added by Lijie
 * @name haimaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the haimaApp
 */
angular.module('haimaApp')
  .controller('LoginCtrl',
    function($scope, $state, md5, userService, Util, LoginApi) {

      var init = function() {
        $scope.username = '';
        $scope.password = '';
        $scope.error = '';
      };
      init();

      // 登录成功 保存用户信息
      $scope.saveInfo = function(result) {
        var currentUser = {};
        currentUser.uid = result.data.uid;
        currentUser.nickname = result.data.nickname;
        currentUser.username = result.data.username;
        //currentUser.type = result.data.account_type;
        currentUser.token = result.data.access_token;

        userService.set(currentUser);
      };

      // 登录
      $scope.login = function() {

        // encode
        var passwordCode = md5.createHash($scope.password + 'mosaic');

        $scope.promise = LoginApi.loginUser($scope.username, passwordCode, function(result) {
          if (result) {
            if (result.data) {
              $scope.saveInfo(result);

              $state.go('main.welcome');
            } else if (result.code) {
              Util.putSysMsg('danger', result.code);
            } else {
              Util.putSysMsg('danger', result.msg);
            }
          }
        });
      };
    });
