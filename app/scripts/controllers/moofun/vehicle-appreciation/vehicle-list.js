'use strict';

/**
 * 车型鉴赏后台维护 ctrl
 */
angular.module('moofunApp')
  .controller('VehicleListCtrl', function ($scope, $uibModal, $controller, VehicleListEntity, Util) {
    var statusList = $scope.statusList = [
      {value: '未生效', code: '0'},
      {value: '生效', code: '1'},
      {value: '全部'}
    ];

    var orderList = [
      { value: '1', code: '1' },
      { value: '2', code: '2' },
      { value: '3', code: '3' },
      { value: '4', code: '4' },
      { value: '5', code: '5' },
      { value: '6', code: '6' },
      { value: '7', code: '7' },
      { value: '8', code: '8' },
    ];

    //调用我们父 controller
    var parentCtrl = $controller('BaseListCtrl',
      {
        $scope: $scope, CRUDServices: VehicleListEntity, config: {
          onLoadSuccess: function (result) {
            console.log(result)
            $scope.imgPrefixUrl = result.data.url;
          }
        }
      });
    //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
    angular.extend($scope, parentCtrl);
    $scope.query(true);

    // 打开 新增车型 模态窗
    $scope.openVehicleModal = function (vehicle) {

      //如果是新增，就默认让顺序选择1
      if(!vehicle || !vehicle.id ){
        vehicle = {
          order: '1',
          status: '1'
        };
      }else{
        vehicle.order = String(vehicle.order);
        vehicle = _.omit(vehicle, 'no');
      }
      $uibModal.open({
        animation: false,
        templateUrl: 'views/moofun/vehicle-appreciation/vehicle-detail-modal.html',
        controller: 'VehicleDetailModalCtrl',
        size: 'md',
        backdropClass: 'modal-backdrop',
        backdrop: 'static',
        resolve: {
          data: function () {
            return {
              vehicle: new VehicleListEntity(vehicle),
              statusList: _.initial(statusList),
              orderList: orderList,
              imgPrefixUrl: $scope.imgPrefixUrl
            };
          }
        }
      })
      .result.then(function (_vehicle) {
        //更新
        if((_vehicle || {}).id){
          _vehicle.$update()
            .then(function () {
              $scope.query(true);
              Util.putSysMsg('success', '1003', 'vehicle');
            });
        }
        //新增
        else{
          _vehicle.$save()
          .then(function () {
            $scope.query(true);
            Util.putSysMsg('success', '1001', 'vehicle');
          });
        }
      });
    };
  });
