import "babel-polyfill";
import http from 'http';
import url from 'url';
import Q from 'q';

// console.log(url.parse('http://example.org/'));

// 1. callback
http.get(url.parse('http://example.org/'), function (res) {
  console.log('callback ===> ', res.statusCode);
});

// 2. nested callback
http.get(url.parse("http://example.org/"), function(res){
  http.get(url.parse("http://www.google.com"), function(res){
    console.log('nested callback ====>', res.statusCode);
  });
});

// 3. use promise
var httpGet = function(opts){
  var deferred = Q.defer();
  http.get(opts, deferred.resolve);
  return deferred.promise;
};
httpGet(url.parse("http://example.org/"))
  .then(function(res){
    // console.log(res);
    // console.log(res.statusCode);
    return httpGet("http://www.google.com");
  })
  .then(function(res){
    console.log('promise ===>', res.statusCode);
  })

// 4. Q.all
function test(value) {
  return Q.delay(value, 1000);//延迟1秒
}

Q.all([
  test(10),//执行三个函数
  test(20),
  test(30)
])
.spread((x, y, z) => x + y + z)
.done(function(str){//完成前面的后执行
  console.log(str)
});
