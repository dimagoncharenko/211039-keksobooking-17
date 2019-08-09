'use strict';

(function () {
  const MAP_TOP = 630;
  const MAP_BOTTOM = 130;
  let map = document.querySelector('.map');
  let mainPin = map.querySelector('.map__pin--main');

  let mainPinCenterCoord = {
    x: mainPin.offsetWidth / 2,
    y: mainPin.offsetHeight / 2
  }

  class Coordinate {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  let slider = function (callback) {
    mainPin.addEventListener('mousedown', function (evt) {
      let startCoord = new Coordinate(evt.clientX, evt.clientY);
      let mapRect = map.getBoundingClientRect();

      let onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        let shift = new Coordinate(startCoord.x - moveEvt.clientX, startCoord.y - moveEvt.clientY);
        startCoord = new Coordinate(moveEvt.clientX, moveEvt.clientY);
        let pinPosition = new Coordinate(mainPin.offsetLeft - shift.x , mainPin.offsetTop - shift.y);

        if (startCoord.y - mapRect.top < MAP_BOTTOM + mainPinCenterCoord.y) {
          pinPosition.y = MAP_BOTTOM;
        }

        if (startCoord.y - mapRect.top > MAP_TOP + mainPinCenterCoord.y) {
          pinPosition.y = MAP_TOP;
        }

        if (startCoord.x + mainPinCenterCoord.x > mapRect.right) {
          pinPosition.x = map.offsetWidth - mainPinCenterCoord.x;
        }

        if (startCoord.x - mainPinCenterCoord.x < mapRect.left) {
          pinPosition.x = - mainPinCenterCoord.x;
        }

        callback(pinPosition);
        mainPin.style.top = pinPosition.y + 'px';
        mainPin.style.left = pinPosition.x + 'px';
      }

      let onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
  window.slider = slider;

})();
