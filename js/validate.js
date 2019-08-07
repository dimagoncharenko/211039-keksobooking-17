'use strict';

(function () {
  const typeSelect = document.querySelector('select[name="type"]');
  const minPriceInput = document.querySelector('input[name="price"]');
  const addressInput = document.querySelector('input[name="address"]');
  const timeInSelect = document.querySelector('select[name="timein"]');
  const timeOutSelect = document.querySelector('select[name="timeout"]');
  const btnSubmit = document.querySelector('.ad-form__submit');
  const btnReset = document.querySelector('.ad-form__reset');
  const mainPin = document.querySelector('.map__pin--main');
  const form = document.querySelector('.ad-form');
  const inputAddress = document.querySelector('input[name="address"]');

  const pinStartCoord = {
    top: mainPin.style.top,
    left: mainPin.style.left
  }

  const resetPage= function (evt) {
    evt.preventDefault();
    form.reset();
    mainPin.style.top = pinStartCoord.top;
    mainPin.style.left = pinStartCoord.left;
    inputAddress.value =  parseInt(pinStartCoord.top, 10) + ', ' + parseInt(pinStartCoord.left, 10);
  }

  btnReset.addEventListener('click', resetPage);

  const MinPrice = {
    BUNGALO: 0,
    HOUSE: 5000,
    PALACE: 10000,
    FLAT: 1000
  };

  const AccomodationType = {
    BUNGALO: 'bungalo',
    HOUSE: 'house',
    PALACE: 'palace',
    FLAT: 'flat'
  };

  addressInput.disabled = true;

  const onSelectTypeChange = function () {
    switch (typeSelect.value) {
      case AccomodationType.BUNGALO:
        minPriceInput.min = MinPrice.BUNGALO;
        minPriceInput.placeholder = MinPrice.BUNGALO;
        break;
      case AccomodationType.HOUSE:
        minPriceInput.min = MinPrice.HOUSE;
        minPriceInput.placeholder = MinPrice.HOUSE;
        break;
      case AccomodationType.PALACE:
        minPriceInput.min = MinPrice.PALACE;
        minPriceInput.placeholder = MinPrice.PALACE;
      case AccomodationType.FLAT:
        minPriceInput.min = MinPrice.FLAT;
        minPriceInput.placeholder = MinPrice.FLAT;
        break;
    }
  };

  const onTimeChange = function (evt) {
    let currentSelect = evt.currentTarget
    let timeSelectValue = currentSelect.value;
    let option;
    if (currentSelect === timeInSelect) {
      option = timeOutSelect.querySelector(`option[value="${timeSelectValue}"]`).selected = true;
    } else {
      option = timeInSelect.querySelector(`option[value="${timeSelectValue}"]`).selected = true;
    }
  };

  onSelectTypeChange();

  typeSelect.addEventListener('change', onSelectTypeChange);
  timeInSelect.addEventListener('change', onTimeChange);
  timeOutSelect.addEventListener('change', onTimeChange);

  const roomNumberSelect = document.querySelector('select[name="rooms"]');
  const placeNumberSelect = document.querySelector('select[name="capacity"]');

  const PlaceCount = {
    ZERO: '0',
    ONE:'1',
    TWO: '2',
    THREE: '3'
  }

  const RoomCount = {
    MUCH: '100',
    ONE: '1',
    TWO: '2',
    THREE: '3'
  }

  const ErrorMessage = {
    ONE_PLACE: 'Выберите место только для одного человека',
    TWO_PLACE: 'Выберите места для 2 гостей или для 1 гостя',
    THEREE_PLACE: 'Выберите места для 3 гостей, для 2 гостей или для 1 гостя',
    MUCH_PLACE: 'Выберите места не для гостей'
  }

  const checkRoomAndPlace = function () {
    placeNumberSelect.setCustomValidity('');
    let placeNumberValue = placeNumberSelect.value;
    let roomNumberValue = roomNumberSelect.value;

    if (roomNumberValue === RoomCount.ONE) {
      if (placeNumberValue !== PlaceCount.ONE) {
        placeNumberSelect.setCustomValidity(ErrorMessage.ONE_PLACE);
      }
    }

    if (roomNumberValue === RoomCount.TWO) {
      if (placeNumberValue !== PlaceCount.ONE || placeNumberValue !== PlaceCount.TWO) {
        placeNumberSelect.setCustomValidity(ErrorMessage.TWO_PLACE);
      }
    }

    if (roomNumberValue === RoomCount.TREE) {
      if (placeNumberValue === PlaceCount.MUCH) {
        placeNumberSelect.setCustomValidity(ErrorMessage.THEREE_PLACE);
      }
    }

    if (roomNumberValue === RoomCount.MUCH) {
      if (placeNumberValue !== PlaceCount.ZERO) {
        placeNumberSelect.setCustomValidity(ErrorMessage.MUCH_PLACE);
      }
    }
  };

  btnSubmit.addEventListener('click', function () {
    checkRoomAndPlace();
  });

})();
