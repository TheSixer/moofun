/**
 * Created by Administrator on 2016/12/30.
 */
/**
 * Created by Administrator on 2016/12/27.
 */
/**
 * Created by Administrator on 2016/11/7.
 */
'use strict';

/**
 * 车辆解锁绑定审核 列表 ctrl
 */
angular.module('moofunApp')
    .controller('AnalysisreserveCtrl', function ($scope, ReserveAnalysisEntity,$window, $controller, Util,$confirm, $filter, API_END_POINT,$httpParamSerializer) {

        $scope.reviewStatusList = [
            { value: '过去7天', code: '1' },
            { value: '过去30天', code: '2' },
            { value: '过去60天', code: '3' },
            { value: '自选', code: '4' }
        ];

        var today = $filter('date')(new Date(), 'yyyy-MM-dd'),
            firstday = (Date.parse(today)/1000-604800);

        //调用我们父 controller
        var parentCtrl = $controller('BaseListCtrl', {
            $scope: $scope, CRUDServices: ReserveAnalysisEntity, config: {
                filter: {
                    startDate: new Date(moment.unix(firstday)),
                    endDate: new Date(moment.unix(new Date()/1000))
                },
                formatData: function(row) {
                  // row.date = new Date(row.date);
                }
            }
        });
        //通过 angular.extend 把父控制器上的方法和属性绑定到子的对象上
        angular.extend($scope, parentCtrl);
        $scope.query(true);




        $scope.changedate = function(){
            var nowday = $filter('date')(new Date(), 'yyyy-MM-dd');
            var lastday=0;

            switch($scope.selectdate){
                case '1':    //过去7天
                {
                    lastday = (Date.parse(nowday)/1000-604800);
                    $scope.filter.startDate = new Date(moment.unix(lastday));
                    $scope.filter.endDate = new Date(moment.unix(new Date()/1000));
                    $scope.ngDisabled = true;
                }
                    break;
                case '2':    //过去30天
                {
                    lastday = (Date.parse(nowday)/1000-2592000);
                    $scope.filter.startDate = new Date(moment.unix(lastday));
                    $scope.filter.endDate = new Date(moment.unix(new Date()/1000));
                    $scope.ngDisabled = true;
                }
                    break;
                case '3':    //过去60天
                {
                    lastday = (Date.parse(nowday)/1000-5184000);
                    $scope.filter.startDate = new Date(moment.unix(lastday));
                    $scope.filter.endDate = new Date(moment.unix(new Date()/1000));
                    $scope.ngDisabled = true;
                }
                    break;
                case '4':    //自选
                {
                    $scope.ngDisabled = false;
                    $scope.filter.endDate = '';
                    $scope.filter.startDate = '';
                }
                    break;
            }
        };
        $scope.selectdate = '1';
        $scope.changedate();

        var formateDate = function(queryobj)
        {
            var obj = {};
            //Object.assign(obj,queryobj);
            if(queryobj.hasOwnProperty('startDate')) {
                obj.startDate = moment(queryobj.startDate).format('YYYY-MM-DD');
            }
            if(queryobj.hasOwnProperty('endDate')) {
                obj.endDate = moment(queryobj.endDate).format('YYYY-MM-DD');
            }
            return obj;
        };

        //导出Excel
        $scope.exportExcel = function () {
            var url = API_END_POINT.url + '/information/retention/excel?' + $httpParamSerializer(formateDate($scope.filter));
            $window.location.href = url;
        };

    });