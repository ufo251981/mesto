const popupImageSelector = '.popup_zoom';
const templateSelector = '#template';
const placesSelector = '.places';
const popupImageFormSelector = '.popup_add_new-place';
const popupProfileFormSelector = '.popup_add_new-profile';
const popupChangeAvatarSelector = '.popup_change-avatar';
const popupDeleteCardSelector = '.popup_delete-card';

const profileChangeButton = document.querySelector('.profile__image-after');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

const configUserInfo = {
    profileNameSelector: '.profile__info',
    profileJobSelector: '.profile__text',
    profileAvatarSelector: '.profile__image'
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_error_active',
  errorClass: 'popup__error',
  popupInputError: '.popup-error-'
}

const formValidator = {};

export {
  popupImageSelector,
  templateSelector,
  placesSelector,
  popupImageFormSelector,
  popupProfileFormSelector,
  popupChangeAvatarSelector,
  popupDeleteCardSelector,
  profileChangeButton,
  buttonAdd,
  buttonEdit,
  configUserInfo,
  validationConfig,
  formValidator
}