export class FormValidator {
  constructor(config, form) {
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._popupInputError = config.popupInputError;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._form = form;
      this._button = form.querySelector(this._submitButtonSelector);
      this._inputLists = form.querySelectorAll(this._inputSelector);
  }


  _showInputError(errorElement, input)  {
      input.classList.add(this._inputErrorClass);
      errorElement.textContent = input.validationMessage;
      errorElement.classList.add(this._errorClass);
      
  }

  _hideInputError(errorElement, input)  {
      input.classList.remove(this._inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(input)  {
      const errorElement = this._form.querySelector(`${this._popupInputError}${input.id}`);
      !input.validity.valid ? this._showInputError(errorElement, input) : this._hideInputError(errorElement, input);
  }

  _hasInvalidInput()  {
      const formInputs = Array.from(this._inputLists);
      return formInputs.some((input) => !input.validity.valid);
  }

  _enableButton() {
      this._button.disabled = false;
      this._button.classList.remove(this._inactiveButtonClass);
  }

  _disableButton() {
      this._button.disabled = true;
      this._button.classList.add(this._inactiveButtonClass);
  }

  _toggleButtonState() {
      this._hasInvalidInput() ? this._disableButton(this._button) : this._enableButton();
      
  }

  _setEventListeners()  {
      this._inputLists.forEach(input => {
          input.addEventListener('input', () => {
              this._checkInputValidity(input)
              this._toggleButtonState()
          })        
      })
  }

  enableValidation()  {
      this._setEventListeners();
  }

  resetError()  {
      this._inputLists.forEach((input) => {
          const errorElement = this._form.querySelector(`${this._popupInputError}${input.id}`);
          if(!input.validity.valid) {
              this._hideInputError(errorElement, input);
          }
      })
      this._disableButton()
  }
}