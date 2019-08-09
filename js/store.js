'use strict';

(function () {
  let pins;

  let setData = function (data) {
    pins = data.slice();
  };

  let getData = function () {
    return pins.slice();
  };

  window.store = {
    setData: setData,
    getData: getData
  }

})();
