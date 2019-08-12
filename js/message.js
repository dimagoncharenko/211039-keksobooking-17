'use strict';

(function () {
  let errorTemplate = document.querySelector('#error').content;
  let successTemplate = document.querySelector('#success').content;
  let main = document.querySelector('main');

  let onSuccess = function () {
    let cloneTemplate = successTemplate.cloneNode(true);
    main.appendChild(cloneTemplate);
    window.statusPage.onPageDeactivate();

    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', onSuccessClick);
  };

  let onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC) {
      onSuccessClose();
    }
    document.removeEventListener('keydown', onSuccessEscPress);
    document.removeEventListener('click', onSuccessClick);
  };

  let onSuccessClose = function () {
    let successBlock = document.querySelector('.success');
    successBlock.remove();
  };

  let onSuccessClick = function () {
    onSuccessClose();
    document.removeEventListener('click', onSuccessClick);
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  let onErrorBtnClick = function () {
    let errorBlock = document.querySelector('.error');
    errorBlock.remove();
  };

  let onError = function () {
    let cloneError = errorTemplate.cloneNode(true);
    main.appendChild(cloneError);
    const errorBtns = document.querySelectorAll('.error__button');
    errorBtns.forEach((btn) => {
      btn.addEventListener('click', onErrorBtnClick);
    });
  };

  window.message = {
    onError: onError,
    onSuccess: onSuccess
  }
})();
