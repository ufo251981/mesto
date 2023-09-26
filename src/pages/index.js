import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { 
    popupImageSelector,
    templateSelector,
    placesSelector,
    popupImageFormSelector,
    popupProfileFormSelector,
    popupChangeAvatarSelector,
    popupDeleteCardSelector,
    profileChangeButton,
    buttonAdd,
    buttonEdit,
    configUserInfo,
    validationConfig,
    formValidator
 } from "../utils/constants.js"
import './index.css'

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-75',
    headers: {
      authorization: '3a6ea224-9390-4fad-ae02-40ecad18de7a',
      'Content-Type': 'application/json'
    }
  });

Promise.all([api.getInfo(), api.getCards()])
    .then(([dataUser, cardData]) => {
        userInfo.setUserInfo({avatar: dataUser.avatar, username: dataUser.name, text: dataUser.about, id: dataUser._id});
        section.addCards(cardData.reverse())
    })
    .catch((error) => console.error(`Ошибка при отрисовки карточек с сервера ${error}`))

const userInfo = new UserInfo(configUserInfo);

const popupWithImage = new PopupWithImage(popupImageSelector);

const popupDeleteCard = new PopupDeleteCard(popupDeleteCardSelector, ({card, cardId}) => {
    api.deleteCard(cardId)
        .then(() => {
            card.removeClone()
            popupDeleteCard.close()
        })
        .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
        .finally(() => popupDeleteCard.setTextDefault())  
})

const createCard = (data) => {
    const card = new Card({...data, adminId: userInfo.getUserId()}, templateSelector, popupWithImage.open, popupDeleteCard.open, (cardId) => {
        if (card.checkButton()){
            api.deleteLike(cardId)
                .then(res => {
                    card.toggleLike(res.likes)
                })
                .catch((error) => console.error(`Ошибка при удалении лайка ${error}`))
        } else {
            api.addLike(cardId)
                .then(res => {
                    card.toggleLike(res.likes) 
                })
                .catch((error) => console.error(`Ошибка при постановке лайка ${error}`))
        }
    });
    return card.createCard()
}
const section = new Section((data) => {
    section.addItem(createCard(data))
}
, placesSelector);

// Меняем данные в профиле
const popupChangeProfile = new PopupWithForm(popupProfileFormSelector, (data) => {
    api.setUserInfo(data)
        .then((res) => {
            userInfo.setUserInfo({ avatar: res.avatar, username: res.name, text: res.about, _id: res._id });
            popupChangeProfile.close();
        })
        .catch((error) => console.error(`Ошибка при редактировании профиля пользователя ${error}`))
        .finally(() => popupChangeProfile.setTextDefault());
    
});

// Добавляем новую карточку на страницу
const popupAddImage = new PopupWithForm(popupImageFormSelector, (data) => {
    api.addCardOnServer(data)
        .then((cardData) => {
            cardData.adminId = cardData.owner._id
            section.addItem(createCard(cardData))
            popupAddImage.close();
        })
        .catch((error) => console.error(`Ошибка при добавлении карточки на страницу ${error}`))
        .finally(() => popupAddImage.setTextDefault())
});

// userInfo.getUserId()
// console.log(userInfo.getUserId());

const popupChangeAvatar = new PopupWithForm(popupChangeAvatarSelector, (data) => {
    api.setAvatar(data)
    .then(res => {
        userInfo.setUserInfo({ avatar: res.avatar, username: res.name, text: res.about});
        popupChangeAvatar.close();
    })
    .catch((error) => console.error(`Ошибка при редактировании аватара ${error}`))
    .finally(() => popupChangeAvatar.setTextDefault())
    
})

Array.from(document.forms).forEach(item => {
    const form = new FormValidator(validationConfig, item);
    const name = item.getAttribute('name');
    formValidator[name] = form;
    form.enableValidation();
})

popupWithImage.setEventListeners();
popupChangeProfile.setEventListeners();
popupAddImage.setEventListeners();
popupChangeAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

buttonEdit.addEventListener('click', () => {
    formValidator.profile.resetValidationState();
    // loadUserData();
    popupChangeProfile.setInputsValue(userInfo.getUserInfo());
    popupChangeProfile.open();
});

buttonAdd.addEventListener('click', () => {
    formValidator.place.resetValidationState();
    // loadUserData()
    popupAddImage.open();
});

profileChangeButton.addEventListener('click', () => {
    formValidator.avatars.resetValidationState();
    popupChangeAvatar.open();
})


    