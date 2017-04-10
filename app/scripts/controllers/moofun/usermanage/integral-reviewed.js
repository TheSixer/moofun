'use strict';

/**
 * 积分赠送审核 ctrl
 */
angular.module('moofunApp')
  .controller('IntegralReviewedCtrl', function ($scope, IntegralReviewedEntity, $controller,SetIntegralReviewedEntity, Auth,Util,$confirm ,$uibModal) {
    $scope.statusList = [
      {value: '待审批', code: '0'},
      {value: '已通过', code: '1'},
      {value: '已拒绝',code:'2'}
    ];
    // 取得用户信息
    $scope.currentUser = Auth.getCurrentUser();
    //调用我们父 controller
    var parentCtrl = $controller('BaseListCtrl', {
      $scope: $scope, CRUDServices: IntegralReviewedEntity, config: {
        filter: {
          status: '0' //待审批的
        },
        formatData: function (row) {

        }
      }
    });
    //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
    angular.extend($scope, parentCtrl);
    $scope.query(true);

    //点击拒绝
    $scope.openRefused = function(integral) {
        $confirm({
            text: '你确定要拒绝吗？'
        },{
            size: 'md'
        })
            .then(function() {
                //积分审核  -->  拒绝
                SetIntegralReviewedEntity.updateStatus({
                  id:integral.id,
                  reviewer:$scope.currentUser.username,
                  result:2,
                  remark:''
                }, function() {
                    //提示操作成功
                    $scope.query(true);
                    Util.putSysMsg('success', '1010');
                });
            });
    };
    //点击接受
    $scope.openAccpet = function(integral) {
        $confirm({
            text: '你确定要同意吗？'
        }, {
                size: 'md'
            }).then(function() {
                //积分审核  -->  接受
                SetIntegralReviewedEntity.updateStatus({
                  id:integral.id,
                  reviewer:$scope.currentUser.username,
                  result:1,
                  remark:''
                }, function() {
                    //提示操作成功
                    $scope.query(true);
                    Util.putSysMsg('success', '1010');
                });
            });
    };

  });
