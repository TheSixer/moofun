'use strict';

/**
 * 广告管理详情
 */
angular.module('moofunApp')
  .controller('BannersDetailModalCtrl', function ($scope, data , $uibModalInstance, Util, FileEntity, $confirm) {
    $scope.data = data;
    $scope.file = null;
    console.log(data);
    var banners = $scope.data.banners;
    $scope.ok = function (form) {
      if(form.$invalid){
        return Util.putSysMsg('warning', '2002');
      }
      if(!data.banners.id && !$scope.file && data.banners.status === '0'){
        return Util.putSysMsg('warning', '2001', 'image');
      }
      if(data.banners.id && !data.banners.imgUrl){
        return Util.putSysMsg('warning', '2001', 'image');
      }
      if (!$scope.file) {
        $uibModalInstance.close(banners);
      }else{
        //上传文件
        $scope.fileUploadPromise = FileEntity.upload($scope.file)
          .then(function (resp){
            banners.imgUrl = _.result(resp, 'data.data.imgName');
            //关闭窗口
            $uibModalInstance.close(banners);
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
