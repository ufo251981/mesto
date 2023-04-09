
let editButton = document.querySelector('.profile__edit-button_open-popup');
let profileName = document.querySelector('.profile__info_name_value');
let profileProfession = document.querySelector('.profile__text_name_value');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container_form_element');
let closeButton = document.querySelector('.popup__button-close_form_element');

let nameInput = document.querySelector('.popup__input_user_name'); 
let jobInput = document.querySelector('.popup__input_user_job'); 
let buttonSave = document.querySelector('.popup__button-save_close_form');


function openPopup() {
    popup.classList.add('popup_open');
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
}


function closePopup() {
    popup.classList.remove('popup_open');
}


function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup();
}
buttonSave.addEventListener('click', handleFormSubmit);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);