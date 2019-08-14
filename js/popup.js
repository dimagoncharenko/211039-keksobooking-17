'use strict';

(function () {
  const FEATURES_CLASS = 'popup__feature--';
  let popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  let mapPins = document.querySelector('.map__pins');
  let mapFilters = document.querySelector('.map__filters-container');

  let getHouseType = function (dataType) {
    switch (dataType) {
      case window.util.AccomodationType.BUNGALO:
        return 'Бунгало';
        break;
      case window.util.AccomodationType.HOUSE:
        return 'Дом';
        break;
      case window.util.AccomodationType.PALACE:
        return 'Дворец';
        break;
      case window.util.AccomodationType.FLAT:
        return 'Квартира';
        break;
      default: undefined;
    }
  };

  let createPhoto = function (photos, photosWrapper) {
    photos.forEach((photo) => {
      let img = document.createElement('img');
      img.className = 'popup__photo';
      img.width = '45';
      img.height = '40';
      img.src = photo;
      photosWrapper.appendChild(img);
    });
  }

  let onPinClick = function (dataPin) {
    let popup = popupTemplate.cloneNode(true);
    popup.querySelector('.popup__avatar').src = dataPin.author.avatar;
    popup.querySelector('.popup__title').textContent = dataPin.offer.title;
    popup.querySelector('.popup__text--address').textContent = dataPin.offer.address;
    popup.querySelector('.popup__text--address').textContent = dataPin.offer.address;
    popup.querySelector('.popup__text--price').textContent = `${dataPin.offer.price}₽/ночь`;
    popup.querySelector('.popup__type').textContent = getHouseType(dataPin.offer.type);
    popup.querySelector('.popup__text--capacity')
      .textContent = `${dataPin.offer.rooms} комнаты для ${dataPin.offer.guests} + гостей`;
    popup.querySelector('.popup__text--time')
      .textContent = `Заезд после ${dataPin.offer.checkin}, выезд до ${dataPin.offer.checkout}`;
    popup.querySelector('.popup__description').textContent = dataPin.offer.description;

    let photosWrapper = popup.querySelector('.popup__photos');
    photosWrapper.innerHTML = '';
    createPhoto(dataPin.offer.photos, photosWrapper)

    let featuresWrapper = popup.querySelector('.popup__features');
    let features = featuresWrapper.children;
    features = Array.from(features).filter((feature) => {
      return dataPin.offer.features.some((item) => {
        return feature.classList.contains(`${FEATURES_CLASS}${item}`);
      });
    });

    featuresWrapper.innerHTML = '';
    window.util.renderNodes(featuresWrapper, features);
    mapFilters.insertAdjacentElement('beforebegin', popup);

    let btnClose = document.querySelector('.popup__close');
    btnClose.addEventListener('click', onPopupClose);
    document.addEventListener('keydown', onPopupEscPress);
  };

  let fillPopup = function (dataPins, currentPins) {
    currentPins.forEach((pin, i) => {
      pin.addEventListener('click', function () {
        let popup = document.querySelector('.popup');
        if (popup !== null) {
          onPopupClose();
        }
        pin.classList.add('map__pin--active');
        let dataPin = dataPins[i];
        onPinClick(dataPin)
      });
    });
  };

  let getPins = function (dataPins) {
    let currentPins = document.querySelectorAll('.map__pin');
    currentPins = Array.from(currentPins).filter((pin) => !pin.classList.contains('map__pin--main'));
    fillPopup(dataPins, currentPins);
  };

  let removeActivePinClass = function () {
    let activePin = document.querySelector('.map__pin--active');
    if (activePin !== null) {
      activePin.classList.remove('map__pin--active');
    }
  }

  let onPopupClose = function () {
    removeActivePinClass();
    let popup = document.querySelector('.popup');
    if (popup !== null) {
      popup.remove();
    }
  };

  let onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC) {
      onPopupClose();
    }
    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.popup = {
    getPins: getPins,
    onPopupClose: onPopupClose
  };
})();
