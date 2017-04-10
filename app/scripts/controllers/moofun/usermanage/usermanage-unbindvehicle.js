/**
 * Created by Administrator on 2016/11/7.
 */
'use strict';

/**
 * 车辆解锁绑定审核 列表 ctrl
 */
angular.module('moofunApp')
  .controller('UsermanageUnbindvehicleCtrl', function ($scope, UnbindvehicleEntity, $controller, Util, $confirm) {

    $scope.reviewStatusList = [
      { value: '未审核', code: '1' },
      { value: '拒绝', code: '2' },
      { value: '接受', code: '3' },
      { value: '全部' }
    ];
    //调用我们父 controller
    var parentCtrl = $controller('BaseListCtrl', {
      $scope: $scope, CRUDServices: UnbindvehicleEntity, config: {
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

    //重置查询条件
    $scope.reset = function(){
        $scope.filter = {
            reviewStatus:'',
            name:'',
            idcardNo:'',
            phone:'',
            dealerName:'',
            dealerCode:'',
            vin:''
        };
    };
    //点击拒绝
    $scope.openRefused = function(unbindvehicle) {
        $confirm({
            unbindvehicle: unbindvehicle
        }, {
                templateUrl: 'views/moofun/usermanage/usermanage-refusal-reason-modal.html',
                size: 'md'
            })
            .then(function(data) {
                //更新车辆绑定状态  -->  拒绝
                UnbindvehicleEntity.updateStatus({
                    carId: data.carId,
                    type: '0',
                    remark: data.remark,
                    vin: data.vin,
                    orderId: data.orderId
                }, function() {
                    //提示操作成功
                    $scope.query(true);
                    Util.putSysMsg('success', '1010');
                });
            });
    };
    //点击接受
    $scope.openAccpet = function(unbindvehicle) {
        $confirm({
            text: '你确定要接受吗？'
        }, {
                size: 'md'
            }).then(function() {
                //更新车辆绑定状态  -->  接受
                UnbindvehicleEntity.updateStatus({
                    carId: unbindvehicle.carId,
                    type: '1',
                    vin: unbindvehicle.vin,
                    orderId: unbindvehicle.orderId
                }, function() {
                    //提示操作成功
                    $scope.query(true);
                    Util.putSysMsg('success', '1010');
                });
            });
    };
  });