'use strict';

/**
 * 普票申请列表 ctrl
 */
angular.module('moofunApp')
  .controller('GeneralInvoiceApplyListCtrl', function ($scope, GeneralInvoiceEntity, $controller, $confirm, Util) {

    //快递公司
    var expressObj = GeneralInvoiceEntity.getExpressCompanyList(function () {
        expressObj.data = expressObj.data || [];
        _.map(expressObj.data, function (_item) {
          return (_item.code = _item.name);
        });
        expressObj.data.unshift({code: null, name:'请选择快递公司'});
    });

    //调用我们父 controller
    var parentCtrl = $controller('BaseListCtrl', {
      $scope: $scope, CRUDServices: GeneralInvoiceEntity, config: {
        filter: {
          status: 0 //未开票的
        }
      }
    });
    //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
    angular.extend($scope, parentCtrl);
    $scope.query(true);

    //开具发票
    $scope.openInvoice = function (invoice) {
      $confirm({
        invoice: invoice,
        expressList: expressObj.data
      }, {
        templateUrl: 'views/moofun/general-invoice/general-invoice-waybill-update-modal.html',
        size: 'md'
      })
        .then(function (data) {
          //更新该发票的快递单号
          GeneralInvoiceEntity.update({
            id: data.id,
            expressWaybill: data.expressWaybill,
            expressName: data.expressName
          },function (result) {
            invoice.status = result.data.status;
            //提示操作成功
            Util.putSysMsg('success', '1001', 'generalInvoice');
            $scope.query(true);
          });
        });
    };
  });
