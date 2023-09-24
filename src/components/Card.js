export default class Card{
    constructor(data, templateSelector, handleZoomImage, popupDeleteCard, changeLike){
        this._data = data,
        this._templateSelector = templateSelector,
        this._handleZoomImage = handleZoomImage,
        this._popupDeleteCard = popupDeleteCard
        this._changeLike = changeLike
    }
    
    _createPlace() {
        //Клонируем блок кода из темплэйт контейнера
        const createNewCard = document.querySelector(this._templateSelector).content.querySelector('.place').cloneNode(true);        
        return createNewCard;   
    }
    
    //Функция удаляющая карточки со страницы
    _handleCardDelete = () => {
        this._popupDeleteCard({card: this, cardId: this._cardId});
    } 

    //Функция ставящая и убирающая лайк
    _handleLikeImage = () => {
        this._changeLike(this._cardId, this._likeButton);
    }

    _handleOpenImage = () => {
        this._handleZoomImage(this._data)
    }

    _setEventListener() {
        this._likeButton.addEventListener('click', this._handleLikeImage);
        this._deleteButton.addEventListener('click', this._handleCardDelete);
        this._imagePlace.addEventListener('click', this._handleOpenImage);
    }

    _changeGarbigeButton() {
        this._adminId === this._owner ? this._deleteButton.style.display = 'block' : this._deleteButton.style.display = 'none';
    }

    _displayLikes() {
        this._likes.forEach(element => {
            if(element._id === this._adminId) {
                this._likeButton.classList.add('place__like_active')
                return
            }
        })
        this._counter.textContent = this._likesLength;
    }

    toggleLike(likes) {
        this._likeButton.classList.toggle('place__like_active');
        this._counter.textContent = likes.length
    }

    removeClone() {
        this._cloneElement.remove();
        this._cloneElement = null;
    }

    checkButton() {
        return this._likeButton.classList.contains('place__like_active')
    }

    createCard() {
        this._cloneElement = this._createPlace()
        this._imagePlace = this._cloneElement.querySelector('.place__image');
        this._titlePlace = this._cloneElement.querySelector('.place__title');
        this._deleteButton = this._cloneElement.querySelector('.place__delete-button');
        this._likeButton = this._cloneElement.querySelector('.place__like');
        this._counter = this._cloneElement.querySelector('.place__like-number')
        this._titlePlace.textContent = this._data.name;
        this._likes = this._data.likes;
        this._likesLength = this._data.likes.length;
        this._cardId = this._data._id
        this._imagePlace.src = this._data.link;
        this._imagePlace.alt = this._data.name;
        this._adminId = this._data.adminId;
        this._owner = this._data.owner._id;
        this._displayLikes()
        this._changeGarbigeButton();
        this._setEventListener();
        return this._cloneElement;
    }
}