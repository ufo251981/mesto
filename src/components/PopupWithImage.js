import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageText = this._popup.querySelector('.popup__image-text')
  }

  open = (data) => {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupImageText.textContent = data.name;
    super.open()
  }
}