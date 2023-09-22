import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup{
  constructor(popupSelector, submitFn) {
    super(popupSelector);
    this._submitFn = submitFn;
    this._form = document.querySelector('.popup__form_delete_card');
    this._saveButton = this._form.querySelector('.popup__button-save');
    this._defaultButton = this._saveButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFn({card: this._element, cardId: this._cardId})
      this._saveButton.textContent = `${this._saveButton.textContent}...`
    })
  }

  setTextDefault() {
    this._saveButton.textContent = this._defaultButton
  }

  open = ({card, cardId}) => {
    super.open();
    this._element = card;
    this._cardId = cardId;
  }
}