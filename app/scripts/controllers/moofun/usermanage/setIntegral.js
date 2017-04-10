'use strict';

/**
 * 积分变更记录查询 ctrl
 */
angular.module('moofunApp')
  .controller('SetIntegralCtrl', function ($scope, $controller, GetIntegralLogEntity, SetIntegralEntity, $window, $confirm, Util, MOOFUN_END_POINT, $httpParamSerializer) {
    //调用我们父 controller
    var parentCtrl = $controller('BaseListCtrl', {
      $scope: $scope, 
      CRUDServices: GetIntegralLogEntity, 
      config: {
        formatData: function(row) {
          if(row.modifiedTime){
            row.modifiedTime  = new Date(row.modifiedTime );
          }
        }
      }
    });
    //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
    angular.extend($scope, parentCtrl);
    $scope.query(true);

    //导出Excel
    $scope.exportExcel = function() {
      var url = MOOFUN_END_POINT.url + '/integral/rate/log/excel?'  + $httpParamSerializer($scope.filter);
      $window.location.href = url;
      console.log(url);
    };
    $scope.query(true);
    //点击更改
    $scope.openSet = function(integralRate) {
        $confirm({
            integralRate: integralRate
        }, {
            templateUrl: 'views/moofun/usermanage/setIntegral-detail-modal.html',
            size: 'md'
        })
        .then(function(data) {
            //更新积分比例
            SetIntegralEntity.updateStatus({
                rate: data.rate
            }, function() {
                //提示操作成功
                $scope.query(true);
                Util.putSysMsg('success', '1010');
            });
        });
    };
  });
