'use strict';

(function () {
  const DEFAULT_AVA_URL = 'img/muffin-grey.svg';
  let map = document.querySelector('.map');
  let form = document.querySelector('.ad-form');
  let formFilter = document.querySelector('.map__filters');
  let formFieldset = form.querySelectorAll('fieldset');
  let inputAddress = form.querySelector('#address');
  let mainPin = document.querySelector('.map__pin--main');
  let pinStartCoord = {
    top: mainPin.style.top,
    left: mainPin.style.left
  };

  let deactivateForm = function () {
    let previewPhoto = document.querySelector('.ad-form-header__preview img');
    let housePhotos = document.querySelectorAll('.ad-form__photo');
    previewPhoto.src = DEFAULT_AVA_URL;
    form.classList.add('ad-form--disabled');
    form.reset();
    if (housePhotos !== null) {
      window.util.removeNodes(housePhotos);
    }
    formFieldset.forEach((element) => {
      element.disabled = true;
    });
  };

  let activateForm = function () {
    form.classList.remove('ad-form--disabled');
    inputAddress.value = parseInt(pinStartCoord.top, 10) + ', ' + parseInt(pinStartCoord.left, 10);
    formFieldset.forEach((element) => {
      element.disabled = false;
    });
  };

  let onPageActivate = function () {
    let pins = window.store.getData();
    window.renderPin.render(pins);
    window.popup.getPins(pins);
    window.filter(pins);
    activateForm();
    map.classList.remove('map--faded');
    mainPin.removeEventListener('click', onPageActivate);
  };

  let onPageDeactivate = function (evt) {
    if (evt !== undefined) {
      evt.preventDefault();
    }
    deactivateForm();
    let popup = document.querySelector('.popup');
    if (popup !== null) {
      window.popup.onPopupClose();
    }
    formFilter.reset();
    map.classList.add('map--faded');
    mainPin.style.top = pinStartCoord.top;
    mainPin.style.left = pinStartCoord.left;
    let pins = document.querySelectorAll('.map__pin');
    window.util.removePins(pins);
    mainPin.addEventListener('click', onPageActivate);
  };

  window.statusPage = {
    onPageActivate: onPageActivate,
    onPageDeactivate: onPageDeactivate
  };

})();
