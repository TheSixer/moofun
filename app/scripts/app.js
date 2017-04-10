'use strict';

/**
 * @ngdoc overview
 * @name haimaApp
 * @description
 * # haimaApp
 *
 * haimaApp系统的入口文件.
 */
var haimaApp = angular
  .module('haimaApp', [
    'ngTouch',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'angular-md5',
    'angular-confirm',
    'pascalprecht.translate',
    'ngFileUpload',
    'cgBusy',
    'angularPromiseButtons',
    'LocalStorageModule',
    'ui.router',
    'ui.bootstrap',
    'ui.select',
    'ui.grid',
    'ui.grid.resizeColumns',
    'ui.grid.exporter',
    'ui.grid.selection',
    'ui.grid.autoResize',
    'ui.grid.pagination',
    'ui.grid.edit',
    'ui.grid.pinning',
    'moofunApp'
  ]);
var moofunApp = angular
  .module('moofunApp', [
    'ngTouch',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'angular-confirm',
    'pascalprecht.translate',
    'ngFileUpload',
    'angularPromiseButtons',
    'cgBusy',
    'ui.router',
    'ui.bootstrap',
    'ui.select',
    'ui.grid',
    'ui.grid.resizeColumns',
    'ui.grid.exporter',
    'ui.grid.selection',
    'ui.grid.autoResize',
    'ui.grid.pagination'
  ]);
haimaApp
  .run(function($rootScope, $state, $stateParams, $location, $window, userService, i18nService, Auth, HAIMA_END_POINT) {

    // 全局变量
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    // 系统错误信息
    $rootScope.systemAlert = [];
    // 页面错误信息
    $rootScope.mainAlert = [];
    // 选中的菜单
    $rootScope.selectMenu = {};
    // 取菜单的promise
    $rootScope.menuPromise = {};
    // 页面间参数，临时用
    $rootScope.tempParam = {};

    i18nService.setCurrentLang('zh-cn');

    // 从旧DMS系统迁移过来
    // if ($location.search().token) {
    //   var currentUser = {};
    //   currentUser.token = $location.search().token;
    
    //   userService.set(currentUser);
    // }
    // // cookie初始化
    // userService.initFromCookies();

    // 状态迁移时触发
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      // 需要用户认证
      if (toState.data && toState.data.requiresAuth) {
        Auth.isAuthenticated()
          .then(function(isTrue) {
            if (!isTrue) {
              event.preventDefault();
              console.log('尚未登录');
              var url = HAIMA_END_POINT.url;
              console.log(url);
              $window.location.href = url;
            }
          });
      }
      // // 清除系统信息
      // $rootScope.systemAlert = [];
    });

    // 未知状态迁移
    $rootScope.$on('$stateNotFound',
      function(event, unfoundState) {
        console.log('stateNotFound');
        console.log(unfoundState.to);
        console.log(unfoundState.toParams);
        console.log(unfoundState.options);
      });
  });
