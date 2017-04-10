'use strict';

/**
 * 车型鉴赏详情
 */
angular.module('moofunApp')
  .controller('VehicleDetailModalCtrl', function ($scope, data , $uibModalInstance, Util, FileEntity, $confirm) {
    $scope.data = data;
    $scope.file = null;
    console.log(data)
    var vehicle = $scope.data.vehicle;
    $scope.ok = function (form) {
      if(form.$invalid){
        return Util.putSysMsg('warning', '2002');
      }
      if(!data.vehicle.id && !$scope.file && data.vehicle.status === '1'){
        return Util.putSysMsg('warning', '2001', 'image');
      }
      if(data.vehicle.id && !data.vehicle.imgUrl){
        return Util.putSysMsg('warning', '2001', 'image');
      }
      if (!$scope.file) {
        $uibModalInstance.close(vehicle);
      }else{
        //上传文件
        $scope.fileUploadPromise = FileEntity.upload($scope.file)
          .then(function (resp){
            console.log(resp);
            console.log(vehicle);
            vehicle.imgUrl = _.result(resp, 'data.data.imgName');
            console.log(vehicle);
            //关闭窗口
            $uibModalInstance.close(vehicle);
          },angular.noop ,angular.noop
           );
        return $scope.fileUploadPromise;
      }
    };
    // 取消
    $scope.cancel = function () {
        $confirm({
          text: '你是否真的要关闭？'
        }, {
          size: 'xs'
        }).then(function () {
          $uibModalInstance.dismiss('cancel');
        });
    };
  });
