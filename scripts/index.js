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
const namePlace = document.querySelector('.popup__input_place_name');
const linkPlace = document.querySelector('.popup__input_place_link');
const formAddImage = document.querySelector('.popup__form_add_new-place');

//Объявление переменных template блока
const templatePlace = document.getElementById('template');
const placesContainer = document.querySelector('.places');

//Объявление переменных попапа увеличивающего картинки
const popupZoom = document.querySelector('.popup_zoom');
const popupZoomImage = popupZoom.querySelector('.popup__image');
const popupZoomText = popupZoom.querySelector('.popup__image-text');

const formProfileResetButton = formProfile.querySelector('.popup__button-save_new-profile')
const formProfileResetInput = formProfile.querySelectorAll('.popup__input')
const formPlaceResetButton = formAddImage.querySelector('.popup__button-save_new-place')
const formPlaceResetInput = formAddImage.querySelectorAll('.popup__input')


const popupElements = document.querySelectorAll('.popup')

//Функция открывающая попапы
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
    // popupElement.addEventListener('click', closePopupOverlay);
}

//Функция закрывающая попапы
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
    // popupElement.removeEventListener('click', closePopupOverlay);
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
    resetError(formProfile);
    
    nameInput.value = nameProfile.textContent;
    jobInput.value = professionProfile.textContent;
    toggleButtonState(formProfileResetInput, formProfileResetButton, validationConfig.inactiveButtonClass)
    openPopup(popupProfile)
}

//Функция добавляющая изменения в блок с картинками
function handleAddImage(evt, button, obj) {
    evt.preventDefault();

    const name = namePlace.value;
    const link = linkPlace.value;

    const imageToAdd = createPlace({name, link});
    placesContainer.prepend(imageToAdd);

    evt.target.reset()
    closePopup(popupPlace);
}

//Функция создающая карточки на странице
function createPlace(imageCard) {

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
    function handleCardDelete() {
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

    deleteButton.addEventListener('click', handleCardDelete);
    likeButton.addEventListener('click', likeImage);
    imagePlace.addEventListener('click', function() {
        openPopup(popupZoom)
        zoom()
    });
    return createNewCard; 
    
}

popupElements.forEach((item) => {
    item.addEventListener('click', closePopupOverlay)
});

buttonsPopup.forEach((   button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

buttonEdit.addEventListener('click', handleChangeProfile);

formProfile.addEventListener('submit', handleProfileFormSubmit);
formAddImage.addEventListener('submit', handleAddImage);
buttonAdd.addEventListener('click', function() {
    resetError(formAddImage);
    toggleButtonState(formPlaceResetInput, formPlaceResetButton, validationConfig.inactiveButtonClass)
    openPopup(popupPlace)
});

initialCards.forEach((image) => {
    const element = createPlace(image);

    placesContainer.prepend(element);
});
