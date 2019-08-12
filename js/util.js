'use strict';

(function () {
  let AccomodationType = {
    BUNGALO: 'bungalo',
    HOUSE: 'house',
    PALACE: 'palace',
    FLAT: 'flat',
    ANY: 'any'
  };

  let KeyCode = {
    ESC: 27
  }

  let removePins = function (pins) {
    pins = Array.from(pins).filter((pin) => !pin.classList.contains('map__pin--main'));
    pins.forEach((pin) => pin.remove());
  };

  let renderNodes = function (wrapper, nodes) {
    nodes.forEach((node) => wrapper.appendChild(node));
  };

  window.util = {
    AccomodationType: AccomodationType,
    removePins: removePins,
    renderNodes: renderNodes,
    KeyCode: KeyCode
  };

})();
