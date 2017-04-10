'use strict';

/**
 * 广告管理列表 ctrl
 */
angular.module('moofunApp')
  .controller('ActivityListCtrl', function ($scope, $uibModal, $controller, ActivityListEntity, Util) {
    var statusList = $scope.statusList = [
      {value: '生效', code: '1'},
      {value: '未生效', code: '0'},
      {value: '全部'}
    ];

    var typeList = $scope.typeList = [
      { value: '全部'},
      { value: '车主特权', code: '2' },
      { value: '海马活动', code: '1' }
    ];
    var orderList = [
      { value: '1', code: '1' },
      { value: '2', code: '2' },
      { value: '3', code: '3' },
      { value: '4', code: '4' },
      { value: '5', code: '5' },
      { value: '6', code: '6' },
      { value: '7', code: '7' },
      { value: '8', code: '8' }
    ];
    var chooseType =  [
      { value: '车主特权', code: '2' },
      { value: '海马活动', code: '1' }
    ];

    //调用我们父 controller
    var parentCtrl = $controller('BaseListCtrl',
      {
        $scope: $scope, 
        CRUDServices: ActivityListEntity, 
        config: {
          onLoadSuccess: function (result) {
            $scope.imgPrefixUrl = result.data.url;
          }
        }
      });
    //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
    angular.extend($scope, parentCtrl);
    $scope.query(true);

    // 打开 广告条 模态窗
    $scope.openActivityModal = function (activity) {
      console.log(activity);
      //如果是新增，就默认让顺序选择1
      if(!activity || !activity.id ){
        activity = {
          order: '1',
          status: '1'
        };
      }else{
        activity.order = String(activity.order);
        activity = _.omit(activity, 'no');
      }
      $uibModal.open({
        animation: false,
        templateUrl: 'views/moofun/activity/activity-detail-modal.html',
        controller: 'ActivityDetailModalCtrl',
        size: 'md',
        backdropClass: 'modal-backdrop',
        backdrop: 'static',
        resolve: {
          data: function () {
            return {
              activity: new ActivityListEntity(activity),
              statusList: _.initial(statusList),
              orderList: orderList,
              chooseType: chooseType,
              imgPrefixUrl: $scope.imgPrefixUrl
            };
          }
        }
      })
      .result.then(function (_activity) {
        //更新
        if((_activity || {}).id){
          _activity.$update()
            .then(function () {
              $scope.query(true);
              Util.putSysMsg('success', '1003', 'activity');
            });
        }
        //新增
        else{
          _activity.$save()
          .then(function () {
            $scope.query(true);
            Util.putSysMsg('success', '1001', 'activity');
          });
        }
      });
    };
  });
