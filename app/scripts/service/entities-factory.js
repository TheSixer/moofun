'use strict';

angular.module('moofunApp')
  //普通发票
  .factory('GeneralInvoiceEntity', function($resource, API_END_POINT) {
    return $resource(
      API_END_POINT.url + '/generalInvoice/:id', {
        id: '@id'
      }, {
        query: {
          isArray: false
        },
        update: {
          method: 'PUT'
        },
        //获取所有的快递公司
        getExpressCompanyList: {
          method: 'GET',
          params: {
            id: 'expressCompany'
          }
        }
      }
    );
  })
  //增值发票
  .factory('VatInvoiceEntity', function($resource, API_END_POINT) {
    return $resource(
      API_END_POINT.url + '/addedTaxInvoice/:id', {
        id: '@id'
      }, {
        query: {
          isArray: false
        },
        update: {
          method: 'PUT'
        },
        //获取所有的快递公司
        getExpressCompanyList: {
          method: 'GET',
          params: {
            id: 'expressCompany'
          }
        }
      }
    );
  })
  //增值税发票资质
  .factory('AddedTaxInvoiceEntity', function($resource, API_END_POINT) {
    return $resource(
      API_END_POINT.url + '/addedTaxInvoice/model/:id', {
        id: '@id'
      }, {
        query: {
          isArray: false
        },
        update: {
          method: 'PUT'
        }
      }
    );
  })
  //车辆解除绑定审核
  .factory('UnbindvehicleEntity', function($resource, API_END_POINT) {
    return $resource(
      API_END_POINT.url + '/userCars/:id', {
        id: '@id'
      }, {
        query: {
          isArray: false
        },
        updateStatus: {
          method: 'POST',
        }
      }
    );
  })
  //车辆导航序列号查询
  .factory('NavigationEntity', function($resource, API_END_POINT) {
    return $resource(
      API_END_POINT.url + '/car/navigation/', {},{
        query: {
          isArray: false
        },
        updateStatus: {
          method: 'put',
        }
      }
    );
  })
  //车辆导航序列号审核
  .factory('NavigationReviewedEntity', function($resource, API_END_POINT) {
    return $resource(
      API_END_POINT.url + '/car/navigation/reject', {},{
        query: {
          isArray: false
        },
        updateStatus: {
          method: 'put',
        }
      }
    );
  })
  //积分查询
  // .factory('IntegralQueryEntity', function($resource, API_END_POINT) {
  //   return $resource(
  //     API_END_POINT.url + '/integral/:id', {
  //       id: '@id'
  //     }, {
  //       query: {
  //         isArray: false
  //       },
  //       updateStatus: {
  //         method: 'get',
  //       }
  //     }
  //   );
  // })
  // //积分异常
  // .factory('IntegralUnusualEntity', function($resource, API_END_POINT) {
  //   return $resource(
  //     API_END_POINT.url + '/userCars/:id', {
  //       id: '@id'
  //     }, {
  //       query: {
  //         isArray: false
  //       },
  //       updateStatus: {
  //         method: 'POST',
  //       }
  //     }
  //   );
  // })
  //积分赠送
  .factory('IntegralGiveEntity', function($resource, MOOFUN_END_POINT) {
    return $resource(
      MOOFUN_END_POINT.url + '/integral/user/add', {}, {
        query: {
          isArray: false
        },
        updateStatus: {
          method: 'POST',
        }
      }
    );
  })
  //根据车辆信息赠送积分
  .factory('IntegralGiveConfirmEntity', function($resource, MOOFUN_END_POINT) {
    return $resource(
      MOOFUN_END_POINT.url + '/integral/user/add/confirm', {}, {
        query: {
          isArray: false
        },
        updateStatus: {
          method: 'POST',
        }
      }
    );
  })
  //获取用户邦定车辆信息
  .factory('GetUserCarEntity', function($resource, MOOFUN_END_POINT) {
    return $resource(
      MOOFUN_END_POINT.url + '/integral/user/car/:id', {
        id: '@id'
      }, {
        query: {
          isArray: false
        },
        updateStatus: {
          method: 'get',
        }
      }
    );
  })
  //积分查询（用户作为条件）
  .factory('IntegralByUserEntity', function($resource, MOOFUN_END_POINT) {
    return $resource(
      MOOFUN_END_POINT.url + '/integral/user/searchByUserInfo', {}, {
        query: {
          isArray: false
        }
      }
    );
  })
  //用户积分详细
  .factory('IntegralDetailEntity', function($resource, MOOFUN_END_POINT) {
    return $resource(
      MOOFUN_END_POINT.url + '/integral/list/:id', {
        id: '@id'
      }, {
        query: {
          isArray: false
        }
      }
    );
  })
  //获取修改积分比率记录
  .factory('GetIntegralLogEntity', function ($resource, MOOFUN_END_POINT) {
    return $resource(
        MOOFUN_END_POINT.url + '/integral/rate/log', {},
        { query: {isArray: false},
          updateStatus: {
            method: 'POST',
          }
        }
    );
  })
  //修改积分比率
  .factory('SetIntegralEntity', function ($resource, MOOFUN_END_POINT) {
    return $resource(
        MOOFUN_END_POINT.url + '/integral/rate', {},
        { query: {isArray: false},
          updateStatus: {
            method: 'POST',
          }
        }
    );
  })
  //积分赠送审核
  .factory('IntegralReviewedEntity', function ($resource, MOOFUN_END_POINT) {
    return $resource(
        MOOFUN_END_POINT.url + '/integral/user/add/list', {},
        { query: {isArray: false},
          updateStatus: {
            method: 'POST',
          }
        }
    );
  })
  //积分赠送审核操作
  .factory('SetIntegralReviewedEntity', function ($resource, MOOFUN_END_POINT) {
    return $resource(
        MOOFUN_END_POINT.url + '/integral/user/add/review', {},
        { query: {isArray: false},
          updateStatus: {
            method: 'POST',
          }
        }
    );
  })
  //用户分析
  .factory('UserAnalysisEntity', function($resource, API_END_POINT) {
    return $resource(
      API_END_POINT.url + '/information/daily/:id', {
        id: '@id'
      }, {
        query: {
          isArray: false
        },
        updateStatus: {
          method: 'POST',
        }
      }
    );
  })
  //用户状态套餐报表
  .factory('UserPackageStatusReportEntity', function($resource, TEST_END_POINT) {
    return $resource(
      TEST_END_POINT.url + '/user/report', {}, {
        query: {
          isArray: false
        }
      }
    );
  })
  //用户状态套餐报表期限变更
  .factory('SetUserPackageStatusReportEntity', function($resource, TEST_END_POINT) {
    return $resource(
      TEST_END_POINT.url + '/user/tbox/validDate', {}, {
        query: {
          isArray: false
        },
        updateStatus:{
          method:'POST',
        }
      }
    );
  })
  //用户分析
  .factory('ReserveAnalysisEntity', function($resource, API_END_POINT) {
    return $resource(
      API_END_POINT.url + '/information/retention/:id', {
        id: '@id'
      }, {
        query: {
          isArray: false
        },
        updateStatus: {
          method: 'POST',
        }
      }
    );
  })
  //车型鉴赏
  .factory('VehicleListEntity', function($resource, MOOFUN_END_POINT) {
    return $resource(
      MOOFUN_END_POINT.url + '/car/appreciation/:id', 
      {id: '@id'}, 
      {query: {isArray: false},
        update: {
          method: 'put'
        }
      }
    );
  })
  //小程序活动
  .factory('ActivityListEntity', function ($resource, MOOFUN_END_POINT) {
    return $resource(
      MOOFUN_END_POINT.url + '/miniapp/activity/:id',
      { id: '@id' },
      { query: {isArray: false},
        update: {
          method: 'PUT'
        }
      }
    );
  })
  //广告条
  .factory('BannersEntity', function($resource, API_END_POINT) {
    return $resource(
      API_END_POINT.url + '/banners/:id', {
        id: '@id'
      }, {
        query: {
          isArray: false
        },
        update: {
          method: 'PUT'
        }
      }
    );
  })
  //moofun用户
  .factory('UserEntitiy', function($resource, API_END_POINT) {
    return $resource(
      API_END_POINT.url + '/user/:id', {
        id: '@id'
      }, {
        query: {
          isArray: false
        }
      }
    );
  })
  //文件上传服务 上传图片 返回地址
  .factory('FileEntity', function($q, Upload, API_END_POINT) {
    return {
      upload: function(file) {
        var deferred = $q.defer();

        Upload.upload({
          url: API_END_POINT.url + '/banners/uploadImage',
          data: {
            file: file
          }
        }).then(function(resp) {
          deferred.resolve(resp);
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function(resp) {
          deferred.reject(resp);
          console.log('Error status: ' + resp.status);
        }, function(evt) {
          deferred.notify(evt);
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
        return deferred.promise;
      }
    };
  });
