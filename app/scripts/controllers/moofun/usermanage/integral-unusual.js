/**
 * Created by Administrator on 2016/11/7.
 */
'use strict';

/**
 * 积分异常查询 ctrl
 */
angular.module('moofunApp')
  .controller('IntegralUnusualCtrl', function ($scope, IntegralUnusualEntity, $controller, Util, $confirm) {

    $scope.reviewStatusList = [
      { value: '未审核', code: '1' },
      { value: '拒绝', code: '2' },
      { value: '接受', code: '3' },
      { value: '全部' }
    ];
    $scope.statusList = [
      { value: '未审核', code: '1' },
      { value: '拒绝', code: '2' },
      { value: '接受', code: '3' },
      { value: '全部' }
    ];
    //调用我们父 controller
    var parentCtrl = $controller('BaseListCtrl', {
      $scope: $scope, CRUDServices: IntegralUnusualEntity, config: {
        filter: {
          reviewStatus: '1' //默认显示为未审核的
        },
        formatData: function(row) {
          row.create_time = new Date(row.create_time);
        }
      }
    });
    //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
    angular.extend($scope, parentCtrl);
    $scope.query(true);
  });