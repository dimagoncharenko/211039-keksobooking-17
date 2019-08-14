'use strict';

(function () {
  let adForm = document.querySelector('.ad-form');
  let typeSelect = adForm.querySelector('select[name="type"]');
  let minPriceInput = adForm.querySelector('input[name="price"]');
  let addressInput = adForm.querySelector('input[name="address"]');
  let timeInSelect = adForm.querySelector('select[name="timein"]');
  let timeOutSelect = adForm.querySelector('select[name="timeout"]');
  let btnSubmit = adForm.querySelector('.ad-form__submit');
  let btnReset = adForm.querySelector('.ad-form__reset');
  let fields = adForm.querySelectorAll('#title, #price, #capacity, #room_number');
  let roomNumberSelect = adForm.querySelector('select[name="rooms"]');
  let placeNumberSelect = adForm.querySelector('select[name="capacity"]');

  btnReset.addEventListener('click', window.statusPage.onPageDeactivate);

  const MinPrice = {
    BUNGALO: 0,
    HOUSE: 5000,
    PALACE: 10000,
    FLAT: 1000
  };

  addressInput.disabled = true;

  let onSelectTypeChange = function () {
    switch (typeSelect.value) {
      case window.util.AccomodationType.BUNGALO:
        minPriceInput.min = MinPrice.BUNGALO;
        minPriceInput.placeholder = MinPrice.BUNGALO;
        break;
      case window.util.AccomodationType.HOUSE:
        minPriceInput.min = MinPrice.HOUSE;
        minPriceInput.placeholder = MinPrice.HOUSE;
        break;
      case window.util.AccomodationType.PALACE:
        minPriceInput.min = MinPrice.PALACE;
        minPriceInput.placeholder = MinPrice.PALACE;
      case window.util.AccomodationType.FLAT:
        minPriceInput.min = MinPrice.FLAT;
        minPriceInput.placeholder = MinPrice.FLAT;
        break;
    }
  };

  let onTimeChange = function (evt) {
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

  let PlaceCount = {
    ZERO: '0',
    ONE: '1',
    TWO: '2',
    THREE: '3'
  }

  let RoomCount = {
    MUCH: '100',
    ONE: '1',
    TWO: '2',
    THREE: '3'
  }

  let ErrorMessage = {
    ONE_PLACE: 'Выберите место только для одного человека',
    TWO_PLACE: 'Выберите места для 2 гостей или для 1 гостя',
    THEREE_PLACE: 'Выберите места для 3 гостей, для 2 гостей или для 1 гостя',
    MUCH_PLACE: 'Выберите места не для гостей'
  }

  let checkRoomAndPlace = function () {
    placeNumberSelect.setCustomValidity('');
    let placeNumberValue = placeNumberSelect.value;
    let roomNumberValue = roomNumberSelect.value;
    if (roomNumberValue === RoomCount.ONE) {
      if (placeNumberValue !== PlaceCount.ONE) {
        placeNumberSelect.setCustomValidity(ErrorMessage.ONE_PLACE);
      }
    }

    if (roomNumberValue === RoomCount.TWO) {
      if (placeNumberValue > PlaceCount.TWO || placeNumberValue === PlaceCount.ZERO) {
        placeNumberSelect.setCustomValidity(ErrorMessage.TWO_PLACE);
      }
    }

    if (roomNumberValue === RoomCount.THREE) {
      if (placeNumberValue === PlaceCount.ZERO) {
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
    fields.forEach((field) => {
      if (field === roomNumberSelect || field === placeNumberSelect) {
        checkRoomAndPlace();
      }
      if (!field.checkValidity()) {
        field.style.border = '1px solid red';
      } else {
        field.style.border = '';
      }
    });
  });

})();
