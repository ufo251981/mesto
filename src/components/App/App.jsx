
import '../../index.css'
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';
import { useState } from 'react';
import ImagePopup from '../ImagePopup/ImagePopup.jsx';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isZoomPopup, setIsZoomPopup] = useState(false)

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsZoomPopup(false)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
 
  function handleCardClick(card) {
    setSelectedCard(card)
    setIsZoomPopup(true)
  }

  return (
    <div className="body">
      <Header />

      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="edit-profile"
        title="Редактировать&nbsp;профиль"
        buttonTitle="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input
            id="username"
            type="text"
            required=""
            minLength={2}
            maxLength={40}
            name="profile-name"
            placeholder="Имя"
            className="popup__input popup__input_user_name"
          />
          <span className="popup__error popup-error-username" />
        </div>
        <div className="popup__input-container">
          <input
            id="text"
            type="text"
            required=""
            minLength={2}
            maxLength={200}
            name="profile-text"
            placeholder="О себе"
            className="popup__input popup__input_user_job"
          />
          <span className="popup__error popup-error-text" />
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="add-place"
        title="Новое место"
        buttonTitle="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input
            id="title"
            type="text"
            required=""
            minLength={2}
            maxLength={30}
            name="place-title"
            placeholder="Название"
            className="popup__input popup__input_place_name"
          />
          <span className="popup__error popup-error-title" />
        </div>
        <div className="popup__input-container">
          <input
            id="link"
            type="url"
            required=""
            name="place-links"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_place_link"
          />
          <span className="popup__error popup-error-link" />
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="change-avatar"
        title="Обновить аватар"
        buttonTitle="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input
            id="avatar"
            type="url"
            required=""
            name="avatar"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_avatar_link"
          />
          <span className="popup__error popup-error-avatar" />
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        buttonTitle="Да"
      />
      <ImagePopup 
        card={selectedCard} 
        isOpen={isZoomPopup} 
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
