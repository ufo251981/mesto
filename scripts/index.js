//import {initialCards} from "./array"


//Объявление переменных заглавного блока
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__info');
const profileProfession = document.querySelector('.profile__text');

//Объявление переменных попапа заглавного блока
//const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_add_new-profile')//
const formElement = document.querySelector('.popup__form');
const closeButton = document.querySelector('.popup__button-close');
const nameInput = document.querySelector('.popup__input_user_name'); 
const jobInput = document.querySelector('.popup__input_user_job'); 

//Объявление переменных попапа добавляющего картинки
const addButton = document.querySelector('.profile__add-button');
const placeClose = document.querySelector('.popup__button-close_new-place');
const placeSave = document.querySelector('.popup__button-save_new-place');
const popupPlace = document.querySelector('.popup_add_new-place');

const templatePlaceContainer = document.querySelector('.places');
const templatePlace = document.getElementById('template');
const formAddImage = document.querySelector('.popup__form_add_new-place')

//Функция открывающая попап заглавного блока
function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
    //nameInput.value = profileName.textContent;
    //jobInput.value = profileProfession.textContent;
}


//Функция закрывающая попап заглавного блока
/*function closePopup() {
    popup.classList.remove('popup_opened');
}*/

//Функция добавляющая изменения в главный блок
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    togglePopup(popupProfile); 
}
editButton.addEventListener('click', function() {
    togglePopup(popupProfile)
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
});
closeButton.addEventListener('click', function() {
    togglePopup(popupProfile)
});
formElement.addEventListener('submit', handleFormSubmit);
formAddImage.addEventListener('submit', handleAddImage)

//Функция добавляющая изменения в блок с картинками
function handleAddImage(evt) {
    evt.preventDefault();
    const placeName = document.querySelector('.popup__input_place_name').value;
    const placeLink = document.querySelector('.popup__input_place_link').value;
    const imageToAdd = addNewPlace({name: placeName, link: placeLink});
    templatePlaceContainer.prepend(imageToAdd);
    document.querySelector('.popup__input_place_name').value = "";
    document.querySelector('.popup__input_place_link').value = "";
    togglePopup(popupPlace);
}
//Окрытие попап Новое место
addButton.addEventListener('click', function() {
    togglePopup(popupPlace)
});
//Закрытие попап Новое место
placeClose.addEventListener('click', function() {
    togglePopup(popupPlace)
});

//Функция создающая карточки на странице
function addNewPlace(imageCard) {
    //Клонируем блок кода из темплэйт контейнера
    const createNewCard = templatePlace.content.querySelector('.place').cloneNode(true);
    //Назначаем переменные
    const deleteButton = createNewCard .querySelector('.place__delete-button');
    const likeButton = createNewCard .querySelector('.place__like');
    const imagePlace = createNewCard .querySelector('.place__image');
    const titlePlace = createNewCard .querySelector('.place__title');
    const popupZoom = document.querySelector('.popup-zoom');
    const popupZoomImage = popupZoom.querySelector('.popup-zoom__image');
    const popupZoomText = popupZoom.querySelector('.popup-zoom__image-text');
    const popupZoomButton = popupZoom.querySelector('.popup-zoom__button-close ');
    //Берём значения из массива и присваиваем их переменным клонированного блока
    imagePlace.src = imageCard.link;
    imagePlace.alt = imageCard.name;
    titlePlace.textContent = imageCard.name;
    //Функция удаляющая карточки со страницы
    function deleteCard() {
        createNewCard.remove();
    } 
    //Функция ставящая и убирающая лайк
    function likeImage() {
        likeButton.classList.toggle('place__like_active');
        
    }
    //Функция 
    function zoom() {
        popupZoom.classList.add('popup-zoom_active');
        popupZoomImage.src = imageCard.link;
        popupZoomText.textContent = imageCard.name;
    }

    function reductionImage() {
        popupZoom.classList.remove('popup-zoom_active');
    }

    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likeImage);
    imagePlace.addEventListener('click', zoom);
    popupZoomButton.addEventListener('click', reductionImage);
    //
    
    return createNewCard;
    
}

initialCards.forEach((image) => {
    const element = addNewPlace(image);

    templatePlaceContainer.prepend(element);
});
