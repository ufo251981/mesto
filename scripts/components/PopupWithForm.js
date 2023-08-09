import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitFn) {
    super(popupSelector);
    this._submitFn = submitFn;
    this._form = this._popup.querySelector('.popup__form');
    this._inputEl = this._form.querySelectorAll('.popup__input')
  }

  getInputValue() {
    this._values = {};
    this._inputEl.forEach(input => {
      this._values[input.id] = input.value
    })
    
    return this._values
  }

  setInputValue(userData) {
    this._inputEl.forEach(input => {
      input.value = userData[input.id]
    })
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitFn)
  }
}