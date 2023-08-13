import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section..js";
import UserInfo from "../components/UserInfo.js";
import { 
    initialCards,
    popupImageSelector,
    templateSelector,
    placesSelector,
    popupImageFormSelector,
    popupProfileFormSelector,
    buttonAdd,
    buttonEdit,
    configUserInfo,
    validationConfig,
    formValidator
 } from "../utils/constants.js"
import './index.css'
const userInfo = new UserInfo(configUserInfo);

const popupWithImage = new PopupWithImage(popupImageSelector);

const createCard = (data) => {
    const card = new Card(data, templateSelector, popupWithImage.open);
    return card.createCard()
}
const section = new Section({
    items: initialCards,
    renderer: (data) => {
        section.addItem(createCard(data))
    }
}, placesSelector);

section.addCards();

// Меняем данные в профиле
const popupChangeProfile = new PopupWithForm(popupProfileFormSelector, (data) => {
    userInfo.setUserInfo(data);
    popupChangeProfile.close();
});

// Добавляем новую карточку на страницу
const popupAddImage = new PopupWithForm(popupImageFormSelector, (data) => {
    section.render(data);
    popupAddImage.close();
});

Array.from(document.forms).forEach(item => {
    const form = new FormValidator(validationConfig, item);
    const name = item.getAttribute('name');
    formValidator[name] = form;
    form.enableValidation();
})

popupWithImage.setEventListeners();
popupChangeProfile.setEventListeners();
popupAddImage.setEventListeners();

buttonEdit.addEventListener('click', () => {
    formValidator.profile.resetValidationState();
    popupChangeProfile.setInputsValue(userInfo.getUserInfo());
    popupChangeProfile.open();
});

buttonAdd.addEventListener('click', () => {
    formValidator.place.resetValidationState();
    popupAddImage.open();
});