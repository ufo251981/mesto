import { Card } from "./Cards.js"
import { initialCards } from "./array.js"
import { FormValidator } from "./FormValidator.js";
import { validationConfig } from "./validate.js";
const templatePlace = document.querySelector('#template');
const placesContainer = document.querySelector('.places')
const namePlace = document.querySelector('.popup__input_place_name');
const linkPlace = document.querySelector('.popup__input_place_link');
const popupZoom = document.querySelector('.popup_zoom');
const popupZoomImage = popupZoom.querySelector('.popup__image');
const popupZoomText = popupZoom.querySelector('.popup__image-text');
//Объявление переменных заглавного блока
const buttonEdit = document.querySelector('.profile__edit-button');
const nameProfile = document.querySelector('.profile__info');
const professionProfile = document.querySelector('.profile__text');
//Объявление переменных попапа заглавного блока
const popupProfile = document.querySelector('.popup_add_new-profile');
const formProfile = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_user_name');
const jobInput = document.querySelector('.popup__input_user_job');
const buttonsPopup = document.querySelectorAll('.popup__button');
//Объявление переменных попапа добавляющего картинки
const buttonAdd = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_add_new-place');
const formAddImage = document.querySelector('.popup__form_add_new-place');
const popupElements = document.querySelectorAll('.popup')
//Функция открывающая попапы
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

//Функция закрывающая попапы
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

// Закрытие по esc
function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const popup = document.querySelector('.popup_opened')
        closePopup(popup)
    }
}

//  Закрытие по оверлэй
function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
}

//Функция добавляющая изменения в главный блок
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    professionProfile.textContent = jobInput.value;
    closePopup(popupProfile); 
}

function handleChangeProfile() {
    formProfile.reset();
    profileFormSubmitValidator.resetError()
    nameInput.value = nameProfile.textContent;
    jobInput.value = professionProfile.textContent;
    openPopup(popupProfile)
}

//Функция вызова попап с картинкой
function handleZoomImage(data) {
    popupZoomImage.src = data.link;
    popupZoomImage.alt = data.name;
    popupZoomText.textContent = data.name;
    openPopup(popupZoom);    
}

function addNewImage(element) {
    const card = new Card(element, templatePlace, handleZoomImage);
    const cardElement = card.createCard();
    return cardElement;    
}

function addCard(card, container) {
    card.prepend(container);
}

const profileFormSubmitValidator = new FormValidator(validationConfig, formProfile);
profileFormSubmitValidator.enableValidation();

const formAddNewImageValidator = new FormValidator(validationConfig, formAddImage);
formAddNewImageValidator.enableValidation();

popupElements.forEach((item) => {
    item.addEventListener('click', closePopupOverlay)
}); 

buttonsPopup.forEach((   button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

buttonEdit.addEventListener('click', handleChangeProfile);

formProfile.addEventListener('submit', handleProfileFormSubmit);

formAddImage.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const dataName = {name: namePlace.value, link: linkPlace.value};
    const card = new Card(dataName, templatePlace, handleZoomImage);
    addCard(placesContainer, card.createCard());
    closePopup(popupPlace);
});

buttonAdd.addEventListener('click', function() {
    formAddImage.reset()
    formAddNewImageValidator.resetError();
    // toggleButtonState(formPlaceResetInput, formPlaceResetButton, validationConfig.inactiveButtonClass)
    openPopup(popupPlace)
});

//Функция создающая карточки на странице

initialCards.forEach(element => {
    addCard(placesContainer, addNewImage(element));
});