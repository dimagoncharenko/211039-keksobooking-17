'use strict';

(function () {
  let TYPES_OF_IMAGES = {
    'GIF': '',
    'JPEG': '',
    'PNG': ''
  };

  let previewImage = document.querySelector('.ad-form-header__preview img');
  let photoaAvatarInput = document.querySelector('.ad-form-header__input');
  let photoHouseInput = document.querySelector('.ad-form__input');
  let houseWrapperTemplate = document.querySelector('.ad-form__photo');
  let houseWrapper = houseWrapperTemplate.cloneNode(true);
  let formPhotoContainer = document.querySelector('.ad-form__photo-container');
  houseWrapperTemplate.remove();

  let createHouseImg = function (url) {
    let img = document.createElement('img');
    img.width = 70;
    img.height = 70;
    img.src = url;
    return img;
  };

  let changeInputFile = function (evt) {
    let file = evt.currentTarget.files[0];
    showPreviewImage(file, evt);
  };

  let showPreviewImage = function (imageFile, evt) {
    let fileRegExp = new RegExp('^image/(' + Object.keys(TYPES_OF_IMAGES).join('|').replace('\+', '\\+') + ')$', 'i');
    if (!fileRegExp.test(imageFile.type)) {
      return;
    }

    let fileReader = new FileReader();
    if (evt.currentTarget === photoaAvatarInput) {
      fileReader.addEventListener('load', onAvatarDisplay);
    } else {
      fileReader.addEventListener('load', onHouseDisplay);
    }
    fileReader.readAsDataURL(imageFile);
  };

  let onAvatarDisplay = function (evt) {
    previewImage.src = evt.target.result;
  };

  let onHouseDisplay = function (evt) {
    let cloneHouseWrapper = houseWrapper.cloneNode(true);
    let photo = createHouseImg(evt.target.result);
    cloneHouseWrapper.appendChild(photo);
    formPhotoContainer.appendChild(cloneHouseWrapper);
  };

  photoaAvatarInput.addEventListener('change', changeInputFile);
  photoHouseInput.addEventListener('change', changeInputFile);
})();
