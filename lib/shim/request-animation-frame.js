// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

var requestAnimationFrameShim = window.requestAnimationFrame;

var vendors = ['ms', 'moz', 'webkit', 'o'];
for (var x = 0; x < vendors.length && !requestAnimationFrameShim; ++x) {
  requestAnimationFrameShim = window[vendors[x] + 'RequestAnimationFrame'];
}

var lastTime = 0;
requestAnimationFrameShim = requestAnimationFrameShim || function(callback, element) {
  var currTime = new Date().getTime();
  var timeToCall = Math.max(0, 16 - (currTime - lastTime));
  var id = window.setTimeout(function() {
    callback(currTime + timeToCall);
  }, timeToCall);
  lastTime = currTime + timeToCall;
  return id;
};

module.exports = requestAnimationFrameShim;
