'use strict';

(function () {
  let typeSelect = document.querySelector('select[name="housing-type"]');

  let updatePins = function (newPins) {
    let currentPins = document.querySelectorAll('.map__pin');
    window.util.removePins(currentPins);
    window.renderPin.render(newPins);
  };

  let filter = function (pins) {
    let clonePins = pins.slice();

    let onTypeSelectChange = function (evt) {
      let target = evt.currentTarget;
      switch (target.value) {
        case window.util.AccomodationType.BUNGALO:
          let bungaloPins = clonePins.filter((pin) => pin.offer.type === window.util.AccomodationType.BUNGALO);
          updatePins(bungaloPins);
          break;
        case window.util.AccomodationType.HOUSE:
          let housePins = clonePins.filter((pin) => pin.offer.type === window.util.AccomodationType.HOUSE);
          updatePins(housePins);
          break;
        case window.util.AccomodationType.PALACE:
          let palacePins = clonePins.filter((pin) => pin.offer.type === window.util.AccomodationType.PALACE);
          updatePins(palacePins);
          break;
        case window.util.AccomodationType.FLAT:
          let flatPins = clonePins.filter((pin) => pin.offer.type === window.util.AccomodationType.FLAT);
          updatePins(flatPins);
          break;
        case window.util.AccomodationType.ANY:
          updatePins(clonePins);
          break;
      }
    }

    typeSelect.addEventListener('change', onTypeSelectChange);
  };

  window.filter = filter;
})();
