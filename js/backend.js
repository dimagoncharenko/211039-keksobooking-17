'use strict';

(function () {
  const Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data'
  };

  const Method = {
    POST: 'POST',
    GET: 'GET'
  }

  const load = (url, method, onLoad) => {
    fetch(url, {
      method: method
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        return `Ошибка ${response.status}`;
      }
    })
    .then((data) => onLoad(data))
  };

  load(Url.LOAD, Method.GET, window.renderPin.onLoad)
})();
