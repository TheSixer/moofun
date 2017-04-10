/**
 * Created by Administrator on 2016/11/7.
 */
'use strict';

/**
 * 积分赠送 ctrl
 */
angular.module('moofunApp')
  .controller('IntegralGiveCtrl', function ($scope, IntegralGiveEntity, $controller, Util, $confirm) {

    $scope.reviewStatusList = [
      { value: '全部' }
    ];
    $scope.statusList = [
      { value: '全部' }
    ];
    //调用我们父 controller
    var parentCtrl = $controller('BaseListCtrl', {
      $scope: $scope, CRUDServices: IntegralGiveEntity, config: {

      }
    });
    //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
    angular.extend($scope, parentCtrl);
    $scope.query(true);

    //赠送积分
    $scope.openIntegral = function (invoice) {
      $confirm({
        invoice: invoice,
        expressList: expressObj.data
      }, {
        templateUrl: 'views/moofun/usermanage/integral-give-detail.html',
        size: 'md'
      })
        .then(function (data) {
          //更新该发票的快递单号
          IntegralGiveEntity.update({
            id: data.id,
            expressWaybill: data.expressWaybill,
            expressName: data.expressName
          },function (result) {
            invoice.status = result.data.status;
            //提示操作成功
            Util.putSysMsg('success', '1001', 'integralGive');
            $scope.query(true);
          });
        });
    };
  });