'use strict';

require('babel-polyfill');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log(url.parse('http://example.org/'));

// 1. callback
_http2.default.get(_url2.default.parse('http://example.org/'), function (res) {
  console.log('callback ===> ', res.statusCode);
});

// 2. nested callback
_http2.default.get(_url2.default.parse("http://example.org/"), function (res) {
  _http2.default.get(_url2.default.parse("http://www.google.com"), function (res) {
    console.log('nested callback ====>', res.statusCode);
  });
});

// 3. use promise
var httpGet = function httpGet(opts) {
  var deferred = _q2.default.defer();
  _http2.default.get(opts, deferred.resolve);
  return deferred.promise;
};
httpGet(_url2.default.parse("http://example.org/")).then(function (res) {
  // console.log(res);
  // console.log(res.statusCode);
  return httpGet("http://www.google.com");
}).then(function (res) {
  console.log('promise ===>', res.statusCode);
});

// 4. Q.all
function test(value) {
  return _q2.default.delay(value, 1000); //延迟1秒
}

_q2.default.all([test(10), //执行三个函数
test(20), test(30)]).spread(function (x, y, z) {
  //三个函数返回的三个值
  console.log(x, y, z);
  return x + y + z;
}).done(function (str) {
  //完成前面的后执行
  console.log(str);
});
