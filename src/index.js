import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import Section from "../scripts/components/Section..js";
import UserInfo from "../scripts/components/UserInfo.js";
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
 } from "../scripts/utils/constants.js"
import './index.css'
const userInfo = new UserInfo(configUserInfo);

const popupWithImage = new PopupWithImage(popupImageSelector);

const section = new Section({
    items: initialCards,
    renderer: (element) => {
        const card = new Card(element, templateSelector, popupWithImage.open);
        console.log();
        return card.createCard();
    }
}, placesSelector);

section.addCard();

const popupChangeProfile = new PopupWithForm(popupProfileFormSelector, (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(popupChangeProfile.getInputValue());
    popupChangeProfile.close();
})

const popupAddImage = new PopupWithForm(popupImageFormSelector, (evt) => {
    evt.preventDefault();
    section.addItem(section.renderer(popupAddImage.getInputValue()));
    popupAddImage.close();
});

Array.from(document.forms).forEach(item => {
    const form = new FormValidator(validationConfig, item);
    const name = item.getAttribute('name');
    formValidator[name] = form;
    form.enableValidation();
    console.log();
})

popupWithImage.setEventListeners();
popupChangeProfile.setEventListeners();
popupAddImage.setEventListeners();

buttonEdit.addEventListener('click', () => {
    formValidator.profile.resetValidationState();
    popupChangeProfile.setInputValue(userInfo.getUserInfo());
    popupChangeProfile.open();
});

buttonAdd.addEventListener('click', () => {
    formValidator.place.resetValidationState();
    popupAddImage.open();
});