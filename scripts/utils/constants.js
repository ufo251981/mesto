const karachaevsk = new URL('../../image/kirill-pershin-karachaevsk-unsplash.jpg', import.meta.url);
const perm = new URL('../../image/daniil-silantev-perm-unsplash.jpg', import.meta.url);
const roza = new URL('../../image/egor-myznik-roza-hutor-unsplash.jpg', import.meta.url);
const dombay = new URL('../../image/kirill-pershin-dombay-unsplash.jpg', import.meta.url);
const elbrus = new URL('../../image/kirill-pershin-elbrus-unsplash.jpg', import.meta.url);
const altay = new URL('../../image/nikolay-tengerekov-altay-unsplash.jpg', import.meta.url);

const initialCards = [
  {
      title: 'Карачаевск',
      link: karachaevsk
  },
  {
      title: 'Пермь',
      link: perm
  },
  {
      title: 'Роза хутор',
      link: roza
  },
  {
      title: 'Домбай',
      link: dombay
  },
  {
      title: 'Эльбрус',
      link: elbrus
  },
  {
      title: 'Алтай',
      link: altay
  }
];

const popupImageSelector = '.popup_zoom';
const templateSelector = '#template';
const placesSelector = '.places'
const popupImageFormSelector = '.popup_add_new-place'
const popupProfileFormSelector = '.popup_add_new-profile'

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

const configUserInfo = {
    profileNameSelector: '.profile__info',
    profileJobSelector: '.profile__text'
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
  initialCards,
  popupImageSelector,
  templateSelector,
  placesSelector,
  popupImageFormSelector,
  popupProfileFormSelector,
  buttonAdd,
  buttonEdit,
  configUserInfo,
  validationConfig,
  formValidator
}