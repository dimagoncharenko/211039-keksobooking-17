'use strict';

(function () {
  const map = document.querySelector('.map');
  const fragment = document.createDocumentFragment();
  const pinTemplate = document.querySelector('#pin').content;
  const mapPins = map.querySelector('.map__pins');
  const form = document.querySelector('.ad-form');
  const formElements = form.querySelectorAll('fieldset');
  const inputAddress = form.querySelector('#address');
  const centerCoord = {
    x: map.offsetWidth / 2,
    y: map.offsetHeight / 2
  }

  const disableForm = function () {
    form.classList.add('ad-form--disabled');
    formElements.forEach((element) => {
      element.disabled = true;
    });
  };

  disableForm();

  inputAddress.value = centerCoord.x + ',' + centerCoord.y;

  const enableForm = function () {
    form.classList.remove('ad-form--disabled');
    formElements.forEach((element) => {
      element.disabled = false;
    });
  }

  const onLoad = function (pins) {
    pins.forEach((pin) => {
      const clonePin = pinTemplate.querySelector('.map__pin').cloneNode(true);
      clonePin.style.left = pin.location.x - 50 + 'px';
      clonePin.style.top = pin.location.y - 70 + 'px';
      clonePin.querySelector('img').src = pin.author.avatar;
      clonePin.querySelector('img').alt = pin.offer.title;
      fragment.appendChild(clonePin);
    });
  };

  const errorTemplate = document.querySelector('#error').content
  const main = document.querySelector('main');

  const onErrorBtnClick = function () {
    const errorBlock = document.querySelector('.error');
    errorBlock.remove();
  }

  const onErrorLoad = function () {
    let cloneError = errorTemplate.cloneNode(true);
    main.appendChild(cloneError);

    const errorBtns = document.querySelectorAll('.error__button');
    errorBtns.forEach((btn) => {
      btn.addEventListener('click', onErrorBtnClick);
    });
  };

  const movePin = function (coord) {
    mapPins.appendChild(fragment);
    map.classList.remove('map--faded');
    enableForm();
    inputAddress.value = coord.x + ',' + coord.y;
  }

  window.slider(movePin)

  window.renderPin = {
    onLoad: onLoad,
    onErrorLoad: onErrorLoad
  }
})();
