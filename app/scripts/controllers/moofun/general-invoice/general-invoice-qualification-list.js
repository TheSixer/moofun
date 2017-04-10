'use strict';

/**
 * 增值税发票资质列表管理 ctrl
 */
angular.module('moofunApp')
  .controller('GeneralInvoiceQualificationListCtrl', function ($scope, AddedTaxInvoiceEntity, $controller, $uibModal) {
    $scope.statusList = [
      {value: '待审批', code: '0'},
      {value: '全部', code: '1'}
    ];

    //调用我们父 controller
    var parentCtrl = $controller('BaseListCtrl', {
      $scope: $scope, CRUDServices: AddedTaxInvoiceEntity, config: {
        filter: {
          status: '0' //待审批的
        },
        formatData: function (row) {
          if(row.createTime){
            row.createTime = new Date(row.createTime);
          }
          if(row.checkTime){
            row.checkTime = new Date(row.checkTime);
          }
        }
      }
    });
    //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
    angular.extend($scope, parentCtrl);
    $scope.query(true);

    //详情
    $scope.openQualification = function (qualification) {
      $uibModal.open({
        animation: false,
        templateUrl: 'views/moofun/general-invoice/general-invoice-qualification-detail-modal.html',
        controller: 'GeneralInvoiceQualificationDetailModalCtrl',
        size: 'lg',
        backdropClass: 'modal-backdrop',
        backdrop: 'static',
        resolve: {
          data: function () {
            return {
              qualification: qualification
            };
          }
        }
      })
      .result.then(function (flag) {
        if(flag) {
          //刷新列表
          $scope.query(true);
        }
      });
    };
  });
