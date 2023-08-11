export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector('.popup__button-close');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleCloseByEsc);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleCloseByEsc);
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener('click', this._handleCloseByBtn);
    this._popup.addEventListener('click', this._handleCloseByOverlay)
  }

  _handleCloseByEsc = (evt) => {
    if (evt.key === "Escape") {
      this.close()
    }
  }

  _handleCloseByOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close()
    }
  }

  _handleCloseByBtn = () => {
    this.close()
  }
}