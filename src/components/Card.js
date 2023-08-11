export default class Card{
    constructor(data, templateSelector, handleZoomImage){
        this._data = data,
        this._templateSelector = templateSelector,
        this._handleZoomImage = handleZoomImage
    }
    
    _createPlace() {
        //Клонируем блок кода из темплэйт контейнера
        const createNewCard = document.querySelector(this._templateSelector).content.querySelector('.place').cloneNode(true);        
        return createNewCard;   
    }
    
    //Функция удаляющая карточки со страницы
    _handleCardDelete = () => {
        this._cloneElement.remove();
        this._cloneElement = null;
    } 

    //Функция ставящая и убирающая лайк
    _handleLikeImage = () => {
        this._likeButton.classList.toggle('place__like_active');
    }

    _handleOpenImage = () => {
        this._handleZoomImage(this._data)
    }

    _setEventListener() {
        this._likeButton.addEventListener('click', this._handleLikeImage);
        this._deleteButton.addEventListener('click', this._handleCardDelete);
        this._imagePlace.addEventListener('click', this._handleOpenImage);
    }

    createCard() {
        this._cloneElement = this._createPlace()
        this._imagePlace = this._cloneElement.querySelector('.place__image');
        this._titlePlace = this._cloneElement.querySelector('.place__title');
        this._deleteButton = this._cloneElement.querySelector('.place__delete-button');
        this._likeButton = this._cloneElement.querySelector('.place__like');
        this._titlePlace.textContent = this._data.title;
        this._imagePlace.src = this._data.link;
        this._imagePlace.alt = this._data.title;
        this._setEventListener()
        return this._cloneElement;
    }
}