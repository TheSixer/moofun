'use strict';

angular.module('haimaApp')
  .config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('welcome');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/index/login.html',
        controller: 'LoginCtrl'
      })
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        data: {
          requiresAuth: true
        }
      })
      .state('main.welcome', {
        url: 'welcome',
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl'
      })
      .state('main.query', {
        url: 'index/query?p',
        templateUrl: 'views/index/query.html'
          // controller: 'QueryCtrl'
      })
      /* ---------------moofun------------------ */
      // 发票管理
      .state('main.general-invoice', {
        url: 'general-invoice',
        abstract: true
      })
      .state('main.general-invoice.applylist', {
        url: '/apply-list',
        views: {
          '@main': {
            templateUrl: 'views/moofun/general-invoice/general-invoice-apply-list.html',
            controller: 'GeneralInvoiceApplyListCtrl',
          }
        }
      })
      .state('main.general-invoice.list', {
        url: '/list',
        views: {
          '@main': {
            templateUrl: 'views/moofun/general-invoice/general-invoice-list.html',
            controller: 'GeneralInvoiceListCtrl'
          }
        }
      })
      //增值税发票
      .state('main.vat-invoice', {
        url: 'vat-invoice',
        abstract: true
      })
      .state('main.vat-invoice.applylist', {
        url: '/apply-list',
        views: {
          '@main': {
            templateUrl: 'views/moofun/vat-invoice/vat-invoice-apply-list.html',
            controller: 'VatInvoiceApplyListCtrl',
          }
        }
      })
      .state('main.vat-invoice.list', {
        url: '/list',
        views: {
          '@main': {
            templateUrl: 'views/moofun/vat-invoice/vat-invoice-list.html',
            controller: 'VatInvoiceListCtrl'
          }
        }
      })
      //增值税发票资质列表管理
      .state('main.general-invoice.qualification-list', {
        url: '/qualification-list',
        views: {
          '@main': {
            templateUrl: 'views/moofun/general-invoice/general-invoice-qualification-list.html',
            controller: 'GeneralInvoiceQualificationListCtrl'
          }
        }
      })
    // 用户管理
    .state('main.usermanage', {
        url: 'usermanage',
        abstract: true
      })
      .state('main.usermanage.unbindvehicle', {
        url: '/unbindvehicle',
        views: {
          '@main': {
            templateUrl: 'views/moofun/usermanage/usermanage-unbindvehicle.html',
            controller: 'UsermanageUnbindvehicleCtrl',
          }
        }
      })
      //moofun用户查询
      .state('main.usermanage.list', {
        url: '/list',
        views: {
          '@main': {
            templateUrl: 'views/moofun/usermanage/usermanage-list.html',
            controller: 'UsermanageListCtrl'
          }
        }
      })
      //积分查询
      .state('main.usermanage.integral-query', {
        url: '/integral-query',
        views: {
          '@main': {
            templateUrl: 'views/moofun/usermanage/integral-query.html',
            controller: 'IntegralQueryCtrl'
          }
        }
      })
      //积分详情
      .state('main.usermanage.integral-detail', {
        url: '/integral-query/:uid',
        views: {
          '@main': {
            templateUrl: 'views/moofun/usermanage/integral-detail.html',
            controller: 'IntegralDetailCtrl'
          }
        }
      })
      //积分设置
      .state('main.usermanage.setIntegral', {
        url: '/setIntegral',
        views: {
          '@main': {
            templateUrl: 'views/moofun/usermanage/setIntegral.html',
            controller: 'SetIntegralCtrl',
          }
        }
      })
      //积分赠送
      .state('main.usermanage.integral-give', {
        url: '/integral-give',
        views: {
          '@main': {
            templateUrl: 'views/moofun/usermanage/integral-give.html',
            controller: 'IntegralGiveCtrl',
          }
        }
      })
      //积分赠送审核
      .state('main.usermanage.integral-reviewed', {
        url: '/integral-reviewed',
        views: {
          '@main': {
            templateUrl: 'views/moofun/usermanage/integral-reviewed.html',
            controller: 'IntegralReviewedCtrl',
          }
        }
      })
      //导航序列号查询
      .state('main.usermanage.navigation', {
        url: '/navigation',
        views: {
          '@main': {
            templateUrl: 'views/moofun/usermanage/usermanage-navigation.html',
            controller: 'NavigationCtrl',
          }
        }
      })
      /* ------------Moofun数据报表------------------ */
      //用户分析
      .state('main.analysis', {
        url: 'analysis',
        abstract: true
      })
      .state('main.analysis.user', {
        url: '/user',
        views: {
          '@main': {
            templateUrl: 'views/moofun/analysis/analysis-user.html',
            controller: 'AnalysisuserCtrl',
          }
        }
      })
      //留存分析
      .state('main.analysis.reserve', {
        url: '/reserve',
        views: {
          '@main': {
            templateUrl: 'views/moofun/analysis/analysis-reserve.html',
            controller: 'AnalysisreserveCtrl'
          }
        }
      })
    // 广告管理
    .state('main.banners', {
        url: 'banners',
        abstract: true
      })
      .state('main.banners.list', {
        url: '/list',
        views: {
          '@main': {
            templateUrl: 'views/moofun/banners/banners-list.html',
            controller: 'BannersListCtrl',
          }
        }
      })
    //车型鉴赏
    .state('main.vehicle-appreciation', {
        url: 'vehicle-appreciation',
        abstract: true
      })
      .state('main.vehicle-appreciation.vehicle-list', {
        url: '/vehicle-list',
        views: {
          '@main': {
            templateUrl: 'views/moofun/vehicle-appreciation/vehicle-list.html',
            controller: 'VehicleListCtrl',
          }
        }
      })
    //小程序活动
    .state('main.activity', {
        url: 'activity',
        abstract: true
      })
      .state('main.activity.activity-list', {
        url: '/activity-list',
        views: {
          '@main': {
            templateUrl: 'views/moofun/activity/activity-list.html',
            controller: 'ActivityListCtrl',
          }
        }
      })
    //用户套餐状态报表
    .state('main.user-related', {
        url: 'user-related',
        abstract: true
      })
      .state('main.user-related.package-status-report', {
        url: '/package-status-report',
        views: {
          '@main': {
            templateUrl: 'views/moofun/user-related/package-status-report.html',
            controller: 'PackageStatusCtrl',
          }
        }
      })
    /* ------------预约管理------------------ */
    .state('main.order-manage', {
        url: 'order-manage',
        abstract: true
      })
    //预约管理
      .state('main.order-manage.order-management', {
        url: '/order-management',
        views: {
          '@main': {
            templateUrl: 'views/moofun/order-manage/order-management.html',
            controller: 'PackageStatusCtrl',
          }
        }
      })
      //预约统计
      .state('main.order-manage.order-statistics', {
        url: '/order-statistics',
        views: {
          '@main': {
            templateUrl: 'views/moofun/order-manage/order-statistics.html',
            controller: 'PackageStatusCtrl',
          }
        }
      })
      //优惠调整
      .state('main.order-manage.preferential-adjustment', {
        url: '/preferential-adjustment',
        views: {
          '@main': {
            templateUrl: 'views/moofun/order-manage/preferential-adjustment.html',
            controller: 'PackageStatusCtrl',
          }
        }
      })
      //支付查询
      .state('main.order-manage.payment-query', {
        url: '/payment-query',
        views: {
          '@main': {
            templateUrl: 'views/moofun/order-manage/payment-query.html',
            controller: 'PackageStatusCtrl',
          }
        }
      })
      //评价查询
      .state('main.order-manage.evaluation-query', {
        url: '/evaluation-query',
        views: {
          '@main': {
            templateUrl: 'views/moofun/order-manage/evaluation-query.html',
            controller: 'PackageStatusCtrl',
          }
        }
      })
      /*---------------收费服务----------------*/
    .state('main.charge-service', {
        url: 'charge-service',
        abstract: true
      })
      //套餐调整
      .state('main.charge-service.package-adjustment', {
        url: '/package-adjustment',
        views: {
          '@main': {
            templateUrl: 'views/moofun/charge-service/package-adjustment.html',
            controller: 'PackageStatusCtrl',
          }
        }
      })
      //套餐购买查询
      .state('main.charge-service.package-purchase-query', {
        url: '/package-purchase-query',
        views: {
          '@main': {
            templateUrl: 'views/moofun/charge-service/package-purchase-query.html',
            controller: 'PackageStatusCtrl',
          }
        }
      })
      //会员充值记录
      .state('main.charge-service.member-recharge-record', {
        url: '/member-recharge-record',
        views: {
          '@main': {
            templateUrl: 'views/moofun/charge-service/member-recharge-record.html',
            controller: 'PackageStatusCtrl',
          }
        }
      })
      //预约交费记录
      .state('main.charge-service.reservation-payment-record', {
        url: '/reservation-payment-record',
        views: {
          '@main': {
            templateUrl: 'views/moofun/charge-service/reservation-payment-record.html',
            controller: 'PackageStatusCtrl',
          }
        }
      })

    /*------------------其他---------------------*/
    .state('main.others', {
        url: 'others',
        abstract: true
      })
      //故障类别
      .state('main.others.fault-classification', {
        url: '/fault-classification',
        views: {
          '@main': {
            templateUrl: 'views/moofun/others/fault-classification.html',
            controller: 'PackageStatusCtrl',
          }
        }
      })
      //问卷调查
      .state('main.others.questionnaire-survey',{
        url: '/questionnaire-survey',
        views: {
          '@main': {
            templateUrl: 'views/moofun/others/questionnaire-survey.html',
            controller: 'PackageStatusCtrl',
          }
        }
      })
      //消息推送
      .state('main.others.message-push',{
        url: '/message-push',
        views: {
          '@main': {
            templateUrl: 'views/moofun/others/message-push.html',
            controller: 'PackageStatusCtrl',
          }
        }
      })
      //统计分析
      .state('main.others.statistical-analysis',{
        url: '/statistical-analysis',
        views: {
          '@main': {
            templateUrl: 'views/moofun/others/statistical-analysis.html',
            controller: 'PackageStatusCtrl',
          }
        }
      })
      //反馈
      .state('main.others.feedback',{
        url: '/feedback',
        views: {
          '@main': {
            templateUrl: 'views/moofun/others/feedback.html',
            controller: 'PackageStatusCtrl',
          }
        }
      });
  });
