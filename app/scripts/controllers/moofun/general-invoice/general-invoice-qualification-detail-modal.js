'use strict';

/**
 * 增值税发票资质列表管理 -- 详情 ctrl
 */
angular.module('moofunApp')
  .controller('GeneralInvoiceQualificationDetailModalCtrl', function ($scope, data, $uibModalInstance, AddedTaxInvoiceEntity) {

    // 直接关闭窗口
    var cancel = $scope.cancel = function (flag) {
      flag = _.isUndefined(flag) ? false : flag;
      $uibModalInstance.close(flag);
    };

    //同意
    $scope.resolve = function () {
      //执行更新操作
      $scope.updatePromise = AddedTaxInvoiceEntity.update({
        id: data.qualification.id,
        status: 2 //同意
      }, function () {
        cancel(true);
      });
    };

    //点击拒绝
    $scope.reject = function () {
      $scope.updatePromise = AddedTaxInvoiceEntity.update({
        id: data.qualification.id,
        refuseCause: data.qualification.refuseCause,
        status: 1 //拒绝
      }, function () {
        cancel(true);
      });
    };

    $scope.data = data;
  });
