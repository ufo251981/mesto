
let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__info');
let profileProfession = document.querySelector('.profile__text');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let closeButton = document.querySelector('.popup__button-close');

let nameInput = document.querySelector('.popup__input_user_name'); 
let jobInput = document.querySelector('.popup__input_user_job'); 


function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
}


function closePopup() {
    popup.classList.remove('popup_opened');
}


function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup();
}
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);