'use strict';

(function () {
  const STATUS_SUCCESS = 200;

  const Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data'
  };

  const Method = {
    POST: 'POST',
    GET: 'GET'
  }


  const load = (url, method, onLoad, onError) => {
    fetch(url, {
      method: method
    })
      .then((response) => {
        if (response.status === STATUS_SUCCESS) {
          response.json()
        }
        throw response.status
      })
      .then((data) => onLoad(data))
      .catch((err) => onError(`Ошибка ${err}`))
  };

  load(Url.LOAD, Method.GET, window.renderPin.onLoad, window.renderPin.onErrorLoad)
})();
