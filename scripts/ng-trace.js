window.angular  = window.angular || {};
window._ngTrace = false;

Object.observe(window.angular, function(changes){
  if (!window._ngTrace && enabled()) {
    window._ngTrace = true;
    inject();
  }
});

function enabled() {
  return window.sessionStorage.getItem('ng-trace') == 'true';
}

function inject() {
  angular.module('ng').config(['$provide', function($provide) {
    $provide.decorator('$q', ['$delegate', function($delegate) {
      $delegate.when = decorate($delegate);
      return $delegate;
    }]);
  }]);
}

function decorate(q) {
  var _when = q.when;
  return function(v) {
    if (v && v.url && enabled() && !/\.html$/.test(v.url)) {
      console.groupCollapsed(v.method, v.url);
      console.trace('ng-trace');
      console.groupEnd();
    }
    return _when.apply(this, arguments);
  }
}
