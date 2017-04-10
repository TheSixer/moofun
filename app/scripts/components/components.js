'use strict';
/**
 * 存放系统中 使用的常量
 */
angular.module('haimaApp')
  .constant('API_END_POINT', {
    url: '/scrm-api'
    // url: '/api'
  })
  .constant('HAIMA_END_POINT', {
    url: '/'
  })
  .constant('MOOFUN_END_POINT',{
    url:'/moofun'
  })
  .constant('TEST_END_POINT',{
    url:'/moofun-test'
  })
  .constant('TOKEN_NAME', 'moofunuser')
  .constant('REGEX', {
    idCard: '^(\\d{15}|\\d{17}[\\d|X])$',
    number: '^\\d+$',
    // 非负整数
    nnInt: '^\\d+$',
    // 非0正整数
    pInt: '^\\+?[1-9][0-9]*$',
    // 带2位小数
    decimal1: '^\\d+(\\.\\d{1})?$',
    // 带2位小数
    decimal2: '^\\d+(\\.\\d{1,2})?$',
    phone: '(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^1[3|4|5|6|7|8|9]\\d{9}$)',
    mobile1: '^(\\+?\\d{2，4})?1[34578]\\d{9}$',
    mobile2: '^1[3|4|5|6|7|8|9]\\d{9}$',
    birthday: '^[12][0-9]{3}[01][0-9][0123][0-9]$',
    birthday2: '^\\d{8}$',
    tel: '^(\\+?\\d{2,4})?((\\d{3,4}\\-?)?\\d{7,8}|1[34578]\\d{9})$',
    vin: '^[A-Z0-9]{17}$',
    //邮政编码
    zipcode: '^\\d{6}$',
  })
  .constant('PAGE_CONST', {
    numPerGet: 150,
    max: 9999,
    pageList: [5, 10, 15, 25, 50]
  });
