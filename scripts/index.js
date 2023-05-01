//Объявление переменных заглавного блока
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__info');
const profileProfession = document.querySelector('.profile__text');

//Объявление переменных попапа заглавного блока
const popupProfile = document.querySelector('.popup_add_new-profile')//
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_user_name'); 
const jobInput = document.querySelector('.popup__input_user_job');
const popupButton = document.querySelectorAll('.popup__button') 

//Объявление переменных попапа добавляющего картинки
const addButton = document.querySelector('.profile__add-button');
const placeClose = document.querySelector('.popup__button-close_new-place');
const placeSave = document.querySelector('.popup__button-save_new-place');
const popupPlace = document.querySelector('.popup_add_new-place');
const placeName = document.querySelector('.popup__input_place_name');
const placeLink = document.querySelector('.popup__input_place_link');
const formAddImage = document.querySelector('.popup__form_add_new-place');

//Объявление переменных template блока
const templatePlace = document.getElementById('template');
const templatePlaceContainer = document.querySelector('.places');

//Объявление переменных попапа увеличивающего картинки
const popupZoom = document.querySelector('.popup_zoom');
const popupZoomImage = popupZoom.querySelector('.popup__image');
const popupZoomText = popupZoom.querySelector('.popup__image-text');
const popupZoomButton = popupZoom.querySelector('.popup__button-close-zoom');

//Функция открывающая попапы
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//Функция закрывающая попапы
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

popupButton.forEach((   button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

//Функция добавляющая изменения в главный блок
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(popupProfile); 
}
editButton.addEventListener('click', function() {
    openPopup(popupProfile)
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
});

formElement.addEventListener('submit', handleFormSubmit);
formAddImage.addEventListener('submit', handleAddImage);

//Функция добавляющая изменения в блок с картинками
function handleAddImage(evt) {
    evt.preventDefault();

    const name = placeName.value;
    const link = placeLink.value;

    const imageToAdd = addNewPlace({name, link});
    templatePlaceContainer.prepend(imageToAdd);

    evt.target.reset()

    closePopup(popupPlace);
}

//Окрытие попап Новое место
addButton.addEventListener('click', function() {
    openPopup(popupPlace)
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
    
    //Функция вызова попап с картинкой
    function zoom() {
        popupZoomImage.src = imageCard.link;
        popupZoomImage.alt = imageCard.name;
        popupZoomText.textContent = imageCard.name;
    }

    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likeImage);
    imagePlace.addEventListener('click', function() {
        openPopup(popupZoom)
        zoom()
    });
    
    //
    
    return createNewCard;
    
}

initialCards.forEach((image) => {
    const element = addNewPlace(image);

    templatePlaceContainer.prepend(element);
});
