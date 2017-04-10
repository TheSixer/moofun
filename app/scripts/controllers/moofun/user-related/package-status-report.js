'use strict';

/**
 * 用户套餐状态报表查询 ctrl
 */
angular.module('moofunApp')
  .controller('PackageStatusCtrl', function ($scope, $controller, UserPackageStatusReportEntity, SetUserPackageStatusReportEntity, $window ,TEST_END_POINT ,$confirm, $httpParamSerializer) {

    //调用我们父 controller
    var parentCtrl = $controller('BaseListCtrl', {
      $scope: $scope, 
      CRUDServices: UserPackageStatusReportEntity, 
      config: {
        filter: {
          status: '' //全部状态下的
        },
        formatData: function(row) {
           row.startTime = new Date(row.startTime);
           row.endTime = new Date(row.endTime);
        }
      }
    });
    //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
    angular.extend($scope, parentCtrl);
    $scope.query(true);

    //重置查询条件
    $scope.reset = function() {
      $scope.filter = {
        status:'',
        tBox:'',
        vin:''//vin码
      };
    };
    //导出Excel
    $scope.exportExcel = function () {
      var url = TEST_END_POINT.url + '/user/report/export?' + $httpParamSerializer($scope.filter);
      console.log(url);
      $window.location.href = url;
    };

    //点击更改
    $scope.openSet = function(validDate) {
        $confirm({
            validDate: validDate
        }, {
            templateUrl: 'views/moofun/user-related/setValidDate-detail-modal.html',
            size: 'md'
        })
        .then(function(data) {
            var newDate = new Date(data.newEndTime);
            var oldDate = new Date(data.endTime);
            var seperator1 = "-";
            var seperator2 = ":";
            var newMonth = newDate.getMonth() + 1;
            var newStrDate = newDate.getDate();
            var oldMonth = oldDate.getMonth() + 1;
            var oldStrDate = oldDate.getDate();
            if (newMonth >= 1 && newMonth <= 9) {
                newMonth = "0" + newMonth;
            }
            if (newStrDate >= 0 && newStrDate <= 9) {
                newStrDate = "0" + newStrDate;
            }
            if (oldMonth >= 1 && oldMonth <= 9) {
                oldMonth = "0" + oldMonth;
            }
            if (oldStrDate >= 0 && oldStrDate <= 9) {
                oldStrDate = "0" + oldStrDate;
            }
           data.newEndTime = newDate.getFullYear() + seperator1 + newMonth + seperator1 + newStrDate + " " + (newDate.getHours()<10?'0'+newDate.getHours():newDate.getHours()) + seperator2 + (newDate.getMinutes()<10?'0'+newDate.getMinutes():newDate.getMinutes()) + seperator2 + (newDate.getSeconds()<10?'0'+newDate.getSeconds():newDate.getSeconds());
           data.endTime = oldDate.getFullYear() + seperator1 + oldMonth + seperator1 + oldStrDate + " " + (oldDate.getHours()<10?'0'+oldDate.getHours():oldDate.getHours()) + seperator2 + (oldDate.getMinutes()<10?'0'+oldDate.getMinutes():oldDate.getMinutes()) + seperator2 + (oldDate.getSeconds()<10?'0'+oldDate.getSeconds():oldDate.getSeconds());
          console.log(data.endTime);
            //更新积分比例
            SetUserPackageStatusReportEntity.updateStatus({
                tbox: data.tBox,
                uid: data.uid,
                oldEndTime:data.endTime,
                newEndTime:data.newEndTime
            }, function() {
                //提示操作成功
                $scope.query(true);
                Util.putSysMsg('success', '1010');
            });
        });
    };
  });
