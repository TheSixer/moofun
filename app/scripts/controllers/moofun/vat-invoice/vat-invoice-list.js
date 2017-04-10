'use strict';

/**
 * 增票查询 ctrl
 */
angular.module('moofunApp')
  .controller('VatInvoiceListCtrl', function ($scope, $controller, VatInvoiceEntity, $window, $uibModal, API_END_POINT, $httpParamSerializer) {

    //快递公司
    var expressObj = VatInvoiceEntity.getExpressCompanyList(function () {
        expressObj.data = expressObj.data || [];
        _.map(expressObj.data, function (_item) {
          return (_item.code = _item.name);
        });
        expressObj.data.unshift({code: null, name:'请选择快递公司'});
    });

    $scope.statusList = [
      {value: '未开票', code: '0'},
      {value: '已开票', code: '1'},
      {value: '全部'}
    ];
    //调用我们父 controller
    var parentCtrl = $controller('BaseListCtrl', {
      $scope: $scope, CRUDServices: VatInvoiceEntity, config: {
        filter: {
          status: '1' //已开票的
        },
        formatData: function(row) {
          if(row.createTime){
            row.createTime = new Date(row.createTime);
          }
          if(row.operationTime){
            row.operationTime = new Date(row.operationTime); 
          }
        }
      }
    });
    //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
    angular.extend($scope, parentCtrl);
    $scope.query(true);

    //导出Excel
    $scope.exportExcel = function () {
      var url = API_END_POINT.url + '/addedTaxInvoice/invoiceExcel?' + $httpParamSerializer($scope.filter);
      //console.log(url);
      $window.location.href = url;
    };

    //详情
    $scope.openWaybill = function (openWaybill) {
      $uibModal.open({
        animation: false,
        templateUrl: 'views/moofun/vat-invoice/vat-invoice-waybill-detail-modal.html',
        controller: 'VatInvoiceWaybillDetailModalCtrl',
        size: 'lg',
        backdropClass: 'modal-backdrop',
        backdrop: 'static',
        resolve: {
          data: function () {
            return {
              qualification: openWaybill
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
