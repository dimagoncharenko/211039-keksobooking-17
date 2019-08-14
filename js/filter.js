'use strict';

(function () {
  let typeSelect = document.querySelector('select[name="housing-type"]');
  let priceSelect = document.querySelector('select[name="housing-price"]');
  let roomSelect = document.querySelector('select[name="housing-rooms"]');
  let guestSelect = document.querySelector('select[name="housing-guests"]');
  let formFilters = document.querySelector('.map__filters');

  let Price = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    ANY: 'any'
  };

  let Room = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    ANY: 'any'
  };

  let Guest = {
    ZERO: '0',
    ONE: '1',
    TWO: '2',
    ANY: 'any'
  };

  let updatePins = function (newPins) {
    let currentPins = document.querySelectorAll('.map__pin');
    window.util.removePins(currentPins);
    window.renderPin.render(newPins);
    window.popup.getPins(newPins);
    window.popup.onPopupClose();
  };

  let filter = function (pins) {
    formFilters.addEventListener('change', onFormChange.bind(null, pins));
  };

  let onTypeSelectChange = function (filteredPins) {
    switch (typeSelect.value) {
      case window.util.AccomodationType.BUNGALO:
        filteredPins = filteredPins.filter((pin) => pin.offer.type === window.util.AccomodationType.BUNGALO);
        break;
      case window.util.AccomodationType.HOUSE:
        filteredPins = filteredPins.filter((pin) => pin.offer.type === window.util.AccomodationType.HOUSE);
        break;
      case window.util.AccomodationType.PALACE:
        filteredPins = filteredPins.filter((pin) => pin.offer.type === window.util.AccomodationType.PALACE);
        break;
      case window.util.AccomodationType.FLAT:
        filteredPins = filteredPins.filter((pin) => pin.offer.type === window.util.AccomodationType.FLAT);
        break;
      case window.util.AccomodationType.ANY:
        filteredPins;
        break;
    }

    return filteredPins;
  };

  let onPriceSelectChange = function (filteredPins) {
    switch (priceSelect.value) {
      case Price.LOW:
        filteredPins = filteredPins.filter((pin) => pin.offer.price < 10000);
        break;
      case Price.MIDDLE:
        filteredPins = filteredPins.filter((pin) => pin.offer.price > 10000 && pin.offer.price < 50000);
        break;
      case Price.HIGH:
        filteredPins = filteredPins.filter((pin) => pin.offer.price > 50000);
        break;
      case Price.ANY:
        filteredPins;
        break;
    }

    return filteredPins;
  };

  let onRoomSelectChange = function (filteredPins) {
    switch (roomSelect.value) {
      case Room.ONE:
        filteredPins = filteredPins.filter((pin) => pin.offer.rooms === parseInt(Room.ONE, 10));
        break;
      case Room.TWO:
        filteredPins = filteredPins.filter((pin) => pin.offer.rooms === parseInt(Room.TWO, 10));
        break;
      case Room.THREE:
        filteredPins = filteredPins.filter((pin) => pin.offer.rooms === parseInt(Room.THREE, 10));
        break;
      case Room.ANY:
        filteredPins;
        break;
    }

    return filteredPins;
  };

  let onGuestSelectChange = function (filteredPins) {
    switch (guestSelect.value) {
      case Guest.ONE:
        filteredPins = filteredPins.filter((pin) => pin.offer.guests === parseInt(Guest.ONE, 10));
        break;
      case Guest.TWO:
        filteredPins = filteredPins.filter((pin) => pin.offer.guests === parseInt(Guest.TWO, 10));
        break;
      case Guest.ZERO:
        filteredPins = filteredPins.filter((pin) => pin.offer.guests === parseInt(Guest.ZERO, 10));
        break;
      case Guest.ANY:
        filteredPins;
        break;
    }

    return filteredPins;
  };

  let onFormChange = function (pins) {
    let featureInputs = document.querySelectorAll('.map__features input:checked');
    let filteredPins = pins.slice();

    featureInputs.forEach((input) => {
      filteredPins = filteredPins.filter((pin) => {
        return pin.offer.features.some((feature) => feature === input.value);
      });
    });

    filteredPins = onTypeSelectChange(filteredPins);
    filteredPins = onPriceSelectChange(filteredPins);
    filteredPins = onRoomSelectChange(filteredPins);
    filteredPins = onGuestSelectChange(filteredPins);

    window.debounce(updatePins.bind(null, filteredPins));
  };

  window.filter = filter;
})();
