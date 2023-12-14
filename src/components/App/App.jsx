import '../../index.css'
import Header from '../Header/Header.jsx'
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';
import { useCallback, useEffect, useState } from 'react';
import ImagePopup from '../ImagePopup/ImagePopup.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import api from '../../utils/api.js';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup.jsx';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup.jsx';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup.jsx';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setisDeletePopupOpen] = useState(false);
  const [isZoomPopup, setIsZoomPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [deleteCardId, setDeleteCardId] = useState('');
  const [isSending, setIsSending] = useState(false);
  

  const [currentUser, setCurrentUser] = useState({})
  
  const [cards, setCards] = useState([])
  console.log(cards);
  const setStatesForPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setisDeletePopupOpen(false)
    setIsZoomPopup(false)
  }, [])

  const closeAllPopupsByEsc = useCallback((evt) => {
    if(evt.key === 'Escape') {
      setStatesForPopups()
      document.removeEventListener('keydown', closeAllPopupsByEsc)
    }
  },[setStatesForPopups])

  const closeAllPopups = useCallback(() =>{
    setStatesForPopups()
    document.removeEventListener('keydown', closeAllPopupsByEsc)
  }, [setStatesForPopups, closeAllPopupsByEsc])
  
  function handleSetEventListener() {
    document.addEventListener('keydown', closeAllPopupsByEsc)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    handleSetEventListener()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    handleSetEventListener()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    handleSetEventListener()
  }

  function handleDeleteCardClick(cardId) {
    setDeleteCardId(cardId)
    setisDeletePopupOpen(true)
    handleSetEventListener()
  }
 
  function handleCardClick(card) {
    setSelectedCard(card)
    setIsZoomPopup(true)
    handleSetEventListener()
  }

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, cardData]) => {
        setCurrentUser(dataUser)
        setCards(cardData)
      })
      .catch((error) => console.error(`Ошибка при отрисовки карточек с сервера ${error}`))
  },[])

  function handleCardDelete(evt) {
    evt.preventDefault()
    setIsSending(true)
    api.deleteCard(deleteCardId)
    .then(() => {
      setCards(cards.filter(card => {
        return card._id !== deleteCardId
      }))
      closeAllPopups()
      setIsSending(false)
    })
    .catch((err) => console.error(`Ошибка при удалении карточки ${err}`))
  }

  function handleUpdateUser(dataUser, reset) {
    setIsSending(true)
    api.setUserInfo(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsSending(false)
      })
      .catch((err) => console.error(`Ошибка при обновлении данных пользователя ${err}`))
  }

  function handleUpdateAvatar(data, reset) {
    setIsSending(true)
    api.setAvatar(data)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsSending(false)
      })
      .catch((err) => console.error(`Ошибка при обновлении аватара пользователя ${err}`))
  }

  function handleUpdatePlace(data, reset) {
    setIsSending(true)
    api.addCardOnServer(data)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups()
        reset()
        setIsSending(false)
      })
      .catch((err) => console.error(`Ошибка при добавлении карточки ${err}`))
  }
      
  return (
  <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header />

        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDelete={handleDeleteCardClick}
          cards={cards}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSending={isSending}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdatePlace={handleUpdatePlace}
          isSending={isSending}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isSending={isSending}
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonTitle="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isSending={isSending}
        />
        <ImagePopup 
          card={selectedCard} 
          isOpen={isZoomPopup}
          onClose={closeAllPopups}
        />
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
