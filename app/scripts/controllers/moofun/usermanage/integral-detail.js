'use strict';

/**
 * 积分详情 ctrl
 */
angular.module('moofunApp')
  .controller('IntegralDetailCtrl', function($scope, $controller, $state, $stateParams, IntegralDetailEntity, $window, Util, MOOFUN_END_POINT, $httpParamSerializer) {

    //初始化页面
    var init = function() {

      //调用我们父 controller
      var parentCtrl = $controller('BaseListCtrl', {
        $scope: $scope,
        CRUDServices: IntegralDetailEntity,
        config: {
          filter: {
            id: $stateParams.uid //客户id
          },
          formatData: function(row) {
            // console.log(row);
            if(row.status === '0') {
              // 获得积分
              row.add = row.score;
            } else {
              // 消费积分
              row.reduce = row.score;
            }
          }
        }
      });

      //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
      angular.extend($scope, parentCtrl);
    };
    init();

    // 返回
    $scope.return = function() {
      $state.go('main.usermanage.integral-query');
    };

    //导出Excel
    $scope.exportExcel = function() {
      var url = MOOFUN_END_POINT.url + '/integral/list/excel/' + $stateParams.uid + '?' + $httpParamSerializer($scope.filter);
      //console.log(url);
      $window.location.href = url;
    };
    $scope.query();
  });
