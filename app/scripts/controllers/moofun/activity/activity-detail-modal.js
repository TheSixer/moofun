'use strict';

/**
 * 活动管理详情
 */
angular.module('moofunApp')
  .controller('ActivityDetailModalCtrl', function ($scope, data , $uibModalInstance, Util, FileEntity, $confirm) {
    $scope.data = data;
    $scope.file = null;
    var activity = $scope.data.activity;
    $scope.ok = function (form) {
      if(form.$invalid){
        return Util.putSysMsg('warning', '2002');
      }
      if(!data.activity.id && !$scope.file && data.activity.status === '0'){
        return Util.putSysMsg('warning', '2001', 'image');
      }
      if(data.activity.id && !data.activity.imgUrl){
        return Util.putSysMsg('warning', '2001', 'image');
      }
      if (!$scope.file) {
        $uibModalInstance.close(activity);
      }else{
        //上传文件
        $scope.fileUploadPromise = FileEntity.upload($scope.file)
          .then(function (resp){
            console.log(resp);
            activity.imgUrl = _.result(resp, 'data.data.imgName');
            console.log(activity);
            //关闭窗口
            $uibModalInstance.close(activity);
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
