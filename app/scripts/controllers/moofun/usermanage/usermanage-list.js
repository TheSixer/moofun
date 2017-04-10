'use strict';

/**
 * 用户管理 --》 moofun用户查询 ctrl
 */
angular.module('moofunApp')
  .controller('UsermanageListCtrl', function ($scope, $controller, UserEntitiy) {
    $scope.statusList = [
      {value: '已绑定', code: '0'},
      {value: '未绑定', code: '1'},
      {value: '全部'}
    ];
    $scope.tboxList = [
      {value: '有', code: '0'},
      {value: '没有', code: '1'},
      {value: '全部'}
    ];
    //调用我们父 controller
    var parentCtrl = $controller('BaseListCtrl', {
      $scope: $scope, CRUDServices: UserEntitiy, config: {
        filter: {
          status: _.noop()
        },
        onBeforeLoad: function (param) {
          //状态 不等于绑定 的时候
          if(param.status !== '0'){
            param.tbox = _.noop();
            $scope.filter.tbox = _.noop();
          }
        },
        formatData: function (row) {
          if(row.tbox === '0') {
            row.tbox = '有';
          }else if(row.tbox === '1'){
            row.tbox = '没有';
          }
        }
      }
    });
    //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
    angular.extend($scope, parentCtrl);
    $scope.query(true);
    // 重置
    $scope.reset = function() {
      $scope.filter = {
        status:'',
        name: '', //客户姓名
        phone: '', //手机号码
        nickname:'',//昵称
        plateNo:'',//车牌号码
        vin:''//vin码
      };
    };
  });
