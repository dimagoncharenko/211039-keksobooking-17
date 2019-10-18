'use strict';

(function () {
  const STATUS_SUCCESS = 200;

  const Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  const Method = {
    POST: 'POST',
    GET: 'GET'
  };

  let load = (url, method, onLoad, onError) => {
    fetch(url, {
      method: method
    })
      .then((response) => {
        if (response.status === STATUS_SUCCESS) {
          return response.json();
        } else {
          throw response.status;
        }

      })
      .then((data) => onLoad(data))
      .catch((err) => onError(`Ошибка ${err}`));
  };

  let upload = (url, method, onLoad, onError, data) => {
    console.log(data);
    fetch(url, {
      method: method,
      body: data
    })
      .then((response) => {
        if (response.status === STATUS_SUCCESS) {
          response.json();
          onLoad();
        } else {
          throw new Error(response.status)
        }
      })
      .catch((err) => onError(console.log(err)));
  };

  load(Url.LOAD, Method.GET, window.renderPin.onLoad, window.message.onError);

  let form = document.querySelector('.ad-form');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const data = new FormData(this);
    upload(Url.UPLOAD, Method.POST, window.message.onSuccess, window.message.onError, data);
  });
})();
