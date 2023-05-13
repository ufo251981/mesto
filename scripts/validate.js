
// const errorElement = document.querySelector(`.${popupInputElement.id}-error`);
// console.log(popupFormElement);
/* function errorVisible(popupFormElement, popupInputElement, errorMessage) {
    const errorElement = popupFormElement.querySelector(`.${popupInputElement.id}-error`);
    popupInputElement.classList.add('popup__input_error_active');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error');
}

function errorHiden(popupFormElement, popupInputElement) {
    const errorElement = popupFormElement.querySelector(`.${popupInputElement.id}-error`);
    popupInputElement.classList.remove('popup__input_error_active');
    errorElement.classList.remove('popup__error');
    errorElement.textContent = '';
} */
const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    activeButtonClass: 'popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_error_active',
    errorClass: 'popup__error'
}

const enableValidation = () => {
    const forms = Array.from(document.querySelectorAll(obj.formSelector))
    
    forms.forEach(form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(form);
    });
}

const setEventListeners = (formToValidate) => {
    const formInputs = Array.from(formToValidate.querySelectorAll(obj.inputSelector))
    const formButton = formToValidate.querySelector(obj.submitButtonSelector)
    disabledButton(formButton)
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
                checkInputValidity(input)
            if (hasInvalidInput(formInputs)) {
                disabledButton(formButton)
                input.classList.add(obj.inputErrorClass);
            } else {
                enableButton(formButton)
                input.classList.remove(obj.inputErrorClass);
            }
        })        
    })
}

const checkInputValidity = (input) => {
    const currentInputErrorContainer = document.querySelector(`.${input.id}-error`)
    if (input.checkValidity()) {
        currentInputErrorContainer.textContent = ''

    } else {
        currentInputErrorContainer.textContent = input.validationMessage
    }
}

const hasInvalidInput = (formInputs) => {
    return formInputs.some(item => !item.validity.valid)
}

const enableButton = (button, ) => {
    button.removeAttribute('disabled')
    button.classList.remove(obj.inactiveButtonClass);
    button.classList.add(obj.activeButtonClass);
}

const disabledButton = (button, ) => {
    button.setAttribute('disabled', true)
    button.classList.add(obj.inactiveButtonClass);
    button.classList.remove(obj.activeButtonClass);
}

enableValidation(obj);