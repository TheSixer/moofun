'use strict';

/**
 * 导航序列号录入和审核 ctrl
 */
angular.module('moofunApp')
  .controller('NavigationCtrl', function ($scope, $controller, NavigationEntity, NavigationReviewedEntity, $confirm, Util, API_END_POINT, $httpParamSerializer) {

    //调用我们父 controller
    var parentCtrl = $controller('BaseListCtrl', {
      $scope: $scope,
      CRUDServices: NavigationEntity, 
      config: {
        filter: {
          
        },
        formatData: function(row) {
          if(row.createTime){
            //row.createTime = new Date(row.createTime);
          }
        }
      }
    });
    //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
    angular.extend($scope, parentCtrl);
    $scope.query(true);

    //重置
    $scope.reset = function() {
      $scope.filter = {
        vin: '', //vin码
        name:''//用户名称
      };
    };

    //点击驳回
    $scope.openRefused = function(navigation) {
        $confirm({
            text: '你确定要驳回吗？'
        },{
            size: 'md'
        }).then(function() {
                //导航序列号审核  -->  拒绝
                NavigationReviewedEntity.updateStatus({
                  carId:navigation.carId,
                  flag: 2
                }, function() {
                    //提示操作成功
                    $scope.query(true);
                    Util.putSysMsg('success', '1010');
                });
            });
    };
    //点击通过
    $scope.openAccpet = function(navigation) {
        $confirm({
            text: '你确定要通过吗？'
        }, {
                size: 'md'
            }).then(function() {
                //导航序列号审核  -->  接受
                NavigationReviewedEntity.updateStatus({
                  carId:navigation.carId,
                  flag: 1
                }, function() {
                    //提示操作成功
                    $scope.query(true);
                    Util.putSysMsg('success', '1010');
                });
            });
    };
  });
