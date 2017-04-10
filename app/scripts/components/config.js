'use strict';

angular.module('haimaApp')

.value('cgBusyDefaults', {
  message: '正在处理，请稍候...',
  backdrop: false,
  templateUrl: 'views/template/loading.html',
  delay: 0,
  minDuration: 0,
})

.config(function(angularPromiseButtonsProvider) {
  angularPromiseButtonsProvider.extendConfig({
    spinnerTpl: '<span class="btn-spinner"><i class="fa fa-spin fa-spinner"></i></span>',
    disableBtn: true,
    btnLoadingClass: 'is-loading',
    addClassToCurrentBtnOnly: false,
    disableCurrentBtnOnly: false,
    minDuration: false,
    CLICK_EVENT: 'click',
    CLICK_ATTR: 'ngClick',
    SUBMIT_EVENT: 'submit',
    SUBMIT_ATTR: 'ngSubmit'
  });
})

.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('haimaApp');
});
