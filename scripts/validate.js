const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_error_active',
    errorClass: 'popup__error',
    popupInputError: '.popup-error-'
}

const enableValidation = (validationConfig) => {
    const forms = Array.from(document.querySelectorAll(validationConfig.formSelector))
    forms.forEach(form => {
        const inputLists = form.querySelectorAll(validationConfig.inputSelector);
        const button = form.querySelector(validationConfig.submitButtonSelector)
        setEventListeners(inputLists, button, validationConfig.inactiveButtonClass,  validationConfig.inputErrorClass, validationConfig.errorClass, validationConfig.popupInputError);
    });
}

const setEventListeners = (inputLists, button, inactiveButtonClass, inputErrorClass, errorClass, popupInputError) => {
    inputLists.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input, inputErrorClass, errorClass, popupInputError)
            toggleButtonState(inputLists, button, inactiveButtonClass )
        })        
    })
}

const checkInputValidity = (input, inputErrorClass, errorClass, popupInputError) => {
    const errorElement = document.querySelector(`${popupInputError}${input.id}`);
    if (!input.validity.valid) {
        showInputError(input, errorElement, inputErrorClass, errorClass)
    } else {
        hideInputError(input, errorElement, inputErrorClass, errorClass)
    }
}

const showInputError = (input, errorElement, inputErrorClass, errorClass) => {
    input.classList.add(inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(errorClass);
}

const hideInputError = (input, errorElement, inputErrorClass, errorClass) => {
    input.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
}

const hasInvalidInput = (inputLists) => {
    const formInputs = Array.from(inputLists);
    return formInputs.some((item) => !item.validity.valid);
}

const toggleButtonState = (inputLists, button, inactiveButtonClass) =>{
    if (!hasInvalidInput(inputLists)){
        button.disabled = false;
        button.classList.remove(inactiveButtonClass);
    } else {
        button.disabled = true;
        button.classList.add(inactiveButtonClass);
    }
}

const resetError = (form) => {
    form.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
        const errorElement = document.querySelector(`${validationConfig.popupInputError}${input.id}`);
        if(!input.validity.valid) {
            hideInputError(input, errorElement, validationConfig.inputErrorClass, validationConfig.errorClass)
        }
    })
}

enableValidation(validationConfig);