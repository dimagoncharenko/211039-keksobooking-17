'use strict';

(function () {
  let AccomodationType = {
    BUNGALO: 'bungalo',
    HOUSE: 'house',
    PALACE: 'palace',
    FLAT: 'flat',
    ANY: 'any'
  };

  let removePins = function (pins) {
    pins = Array.from(pins).filter((pin) => !pin.classList.contains('map__pin--main'));
    pins.forEach((pin) => pin.remove());
  };

  window.util = {
    AccomodationType: AccomodationType,
    removePins: removePins
  }

})();
