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
  console.log(deferred.resolve, deferred.promise);
  return deferred.promise;
};
httpGet(_url2.default.parse("http://example.org/")).then(function (res) {
  // console.log(res);
  // console.log(res.statusCode);
  return httpGet("http://www.google.com");
}).then(function (res) {
  console.log('promise ===>', res.statusCode);
});
