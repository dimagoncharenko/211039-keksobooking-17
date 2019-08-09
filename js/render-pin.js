'use strict';

(function () {
  let map = document.querySelector('.map');
  let fragment = document.createDocumentFragment();
  let pinTemplate = document.querySelector('#pin').content;
  let mapPins = map.querySelector('.map__pins');
  let form = document.querySelector('.ad-form');
  let inputAddress = form.querySelector('#address');
  let errorTemplate = document.querySelector('#error').content
  let main = document.querySelector('main');
  let mainPin = document.querySelector('.map__pin--main');

  window.statusPage.onPageDeactivate();
  mainPin.addEventListener('click', window.statusPage.onPageActivate);

  let renderPins = function (pins) {
    let clonePins = pins.slice(0, 5);
    clonePins.forEach((pin) => {
      let clonePinTemplate = pinTemplate.querySelector('.map__pin').cloneNode(true);
      clonePinTemplate.style.left = pin.location.x - 50 + 'px';
      clonePinTemplate.style.top = pin.location.y - 70 + 'px';
      clonePinTemplate.querySelector('img').src = pin.author.avatar;
      clonePinTemplate.querySelector('img').alt = pin.offer.title;
      fragment.appendChild(clonePinTemplate);
    });
    mapPins.appendChild(fragment);
  };

  let onLoad = function (pins) {
    window.filter(pins);
    window.store.setData(pins);
  };

  let onErrorBtnClick = function () {
    const errorBlock = document.querySelector('.error');
    errorBlock.remove();
  };

  let onErrorLoad = function () {
    let cloneError = errorTemplate.cloneNode(true);
    main.appendChild(cloneError);
    const errorBtns = document.querySelectorAll('.error__button');
    errorBtns.forEach((btn) => {
      btn.addEventListener('click', onErrorBtnClick);
    });
  };

  let movePin = function (coord) {
    inputAddress.value = coord.x + ',' + coord.y;
  }

  window.slider(movePin);

  window.renderPin = {
    onLoad: onLoad,
    onErrorLoad: onErrorLoad,
    render: renderPins
  }
})();
