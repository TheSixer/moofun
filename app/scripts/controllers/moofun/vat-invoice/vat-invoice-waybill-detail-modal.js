'use strict';

/**
 * 增值税发票管理 -- 详情 ctrl
 */
angular.module('moofunApp')
  .controller('VatInvoiceWaybillDetailModalCtrl', function ($scope, data, $uibModalInstance) {

    // 直接关闭窗口
    $scope.cancel = function (flag) {
      flag = _.isUndefined(flag) ? false : flag;
      $uibModalInstance.close(flag);
    };

    $scope.data = data;
  });
