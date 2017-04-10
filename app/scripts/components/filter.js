'use strict';

angular.module('haimaApp')
  .filter('forwardMatchFilter', function() {
    return function(items, props) {
      var out = [];

      if (angular.isArray(items)) {
        items.forEach(function(item) {
          var itemMatches = false;

          var keys = Object.keys(props);
          for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var text = !!props[prop] ? props[prop].toLowerCase() : '';
            // if(text == ''){
            //   return out;
            // }
            if (item[prop].toString().toLowerCase().indexOf(text) === 0) {
              itemMatches = true;
              break;
            }
          }

          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        // Let the output be the input untouched
        out = items;
      }

      return out;
    };
  })

.filter('notArrayFilter', function() {
  return function(input, search) {
    if (!input) {
      return input;
    }
    if (!search) {
      return input;
    }
    var expected = ('' + search).toLowerCase();
    var result = {};
    angular.forEach(input, function(value, key) {
      var actual = ('' + value).toLowerCase();
      if (actual.indexOf(expected) !== -1) {
        result[key] = value;
      }
    });
    return result;
  };
})

.filter('dateFilter', function($filter) {
  return function(input, format) {
    var inputDate = new Date(input);

    var originalFilter = $filter('date');
    return input ? originalFilter(inputDate, format) : '';
  };
})

.filter('unixtimeFilter', function($filter) {
  return function(input, format) {
    if (input) {
      input = input * 1000;
    }

    var originalFilter = $filter('date');
    return input ? originalFilter(input, format) : '';
  };
})

.filter('moneyDefault', function() {
  return function(input) {
    if (!input) {
      input = '0.00';
    }

    return input;
  };
})

.filter('sexFilter', function(Util, codeMasterService) {
  return function(input) {
    var output = '';
    if (input) {
      var codeMaster = codeMasterService.get('sexList');
      output = Util.getValueByCodeOfCodeMaster(codeMaster.sexList, input);
    }

    return output;
    };
})

.filter('codeMasterFilter', function(Util, codeMasterService) {
  return function(input, type) {
    var output = '';
    if (input && type) {
      var codeMaster = codeMasterService.get(type);
      output = Util.getValueByCodeOfCodeMaster(codeMaster[type], input);
    } else {
      output = input;
    }

    return output;
    };
});
