'use strict';

/**
 * 积分查询 ctrl
 */
angular.module('moofunApp')
  .controller('IntegralQueryCtrl', function($scope, $controller, $state, Auth, IntegralByUserEntity, IntegralGiveEntity, GetUserCarEntity, IntegralGiveConfirmEntity, LoginApi, $window, Util, MOOFUN_END_POINT, REGEX, $confirm, $httpParamSerializer) {

    //初始化页面
    var init = function() {
      // 正则表达式
      $scope.pattern = REGEX;

      //调用我们父 controller
      var parentCtrl = $controller('BaseListCtrl', {
        $scope: $scope,
        CRUDServices: IntegralByUserEntity,
        config: {
          filter: {
            name: '', //客户姓名
            phone: '' //手机号码
          },
          formatData: function(row) {
          }
        }
      });

      //通过 angular.extend 把父控制器上的 方法和属性 绑定到 子的对象上
      angular.extend($scope, parentCtrl);

    };
    init();

    // 重置
    $scope.reset = function() {
      $scope.filter = {
        name: '', //客户姓名
        phone: '' //手机号码
      };
    };

    //导出Excel
    $scope.exportExcel = function() {
      var url = MOOFUN_END_POINT.url + '/integral/user/searchByUserInfo/excel?' + $httpParamSerializer($scope.filter);
      $window.location.href = url;
    };

    //查看详情
    $scope.viewDetail = function(row) {

      $state.go('main.usermanage.integral-detail', {
        uid: row.uid
      });
    };

    $scope.query();

    // 取得用户信息
    $scope.currentUser = Auth.getCurrentUser();
    //赠送积分详细
    $scope.giveIntegral = function(integral) {
        GetUserCarEntity.updateStatus({
            id: integral.uid
        }, function(res) {
          if(res.code === '200') {
            if(res.data.total === 0) {

              $scope.giveScoreNoCar(integral);

            } else if(res.data.total === 1) {

              integral.carId = res.data.list[0].carId;
              integral.vin = res.data.list[0].vin;

              $scope.giveScore(integral);
            } else {
              for(var x in res.data.list) {
                res.data.list[x].value = res.data.list[x].vin;
                res.data.list[x].code = x;
              }

              integral.carList = res.data.list;
              integral.vin = '';
              $scope.selectCar(integral);
            }
          }
        });

    };

    $scope.giveScoreNoCar = function(integral) {
        $confirm({
            integral: integral
        }, {
            templateUrl: 'views/moofun/usermanage/integral-give-detail.html',
            size: 'md'
        })
        .then(function(data) {
            IntegralGiveEntity.updateStatus({
                uid: data.uid,
                operator: $scope.currentUser.username,
                score: data.score,
                remark: data.remark
            }, function(res) {
              console.log(res)
              //提示操作成功
              $scope.query(true);
              Util.putSysMsg('success', '1010');
            });
        });
    }

    $scope.giveScore = function(integral) {
        $confirm({
            integral: integral
        }, {
            templateUrl: 'views/moofun/usermanage/integral-give-detail.html',
            size: 'md'
        })
        .then(function(data) {
            IntegralGiveConfirmEntity.updateStatus({
                uid: data.uid,
                operator: $scope.currentUser.username,
                score: data.score,
                remark: data.remark,
                carId: data.carId,
                vin: data.vin
            }, function(res) {
              //提示操作成功
              $scope.query(true);
              Util.putSysMsg('success', '1010');
            });
        });
    }
    //多辆车下，选择获取积分车辆
    $scope.selectCar = function(integral) {
      console.log(integral)
        $confirm({
            integral: integral
        }, {
            templateUrl: 'views/moofun/usermanage/integral-select-car.html',
            size: 'md'
        })
        .then(function(data) {
            integral.carId = data.carList[data.vin].carId;
            integral.vin = data.carList[data.vin].vin;

            $scope.giveScore(integral)

        });
    };

  });
