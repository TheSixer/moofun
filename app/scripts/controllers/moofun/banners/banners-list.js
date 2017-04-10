'use strict';

/**
 * 广告管理列表 ctrl
 */
angular.module('moofunApp')
  .controller('BannersListCtrl', function ($scope, $uibModal, $controller, BannersEntity, Util) {
    var statusList = $scope.statusList = [
      {value: '生效', code: '0'},
      {value: '未生效', code: '1'},
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
        $scope: $scope, CRUDServices: BannersEntity, config: {
          onLoadSuccess: function (result) {
            $scope.imgPrefixUrl = result.data.url;
          }
        }
      });
    //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
    angular.extend($scope, parentCtrl);
    $scope.query(true);

    // 打开 广告条 模态窗
    $scope.openBannersModal = function (banners) {
      //如果是新增，就默认让顺序选择1
      if(!banners || !banners.id ){
        banners = {
          sortOrder: '1',
          status: '1'
        };
      }else{
        banners = _.omit(banners, 'no');
      }
      $uibModal.open({
        animation: false,
        templateUrl: 'views/moofun/banners/banners-detail-modal.html',
        controller: 'BannersDetailModalCtrl',
        size: 'md',
        backdropClass: 'modal-backdrop',
        backdrop: 'static',
        resolve: {
          data: function () {;
            return {
              banners: new BannersEntity(banners),
              statusList: _.initial(statusList),
              orderList: orderList,
              imgPrefixUrl: $scope.imgPrefixUrl
            };
          }
        }
      })
      .result.then(function (_banners) {
        //更新
        if((_banners || {}).id){
          _banners.$update()
            .then(function () {
              $scope.query(true);
              Util.putSysMsg('success', '1003', 'banners');
            });
        }
        //新增
        else{
          _banners.$save()
          .then(function () {
            $scope.query(true);
            Util.putSysMsg('success', '1001', 'banners');
          });
        }
      });
    };
  });
