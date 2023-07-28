export class Card{
    constructor(data, templatePlace, handleZoomImage){
        this._data = data,
        this._src = data.link,
        this._name = data.name,
        this._templatePlace = templatePlace,
        this._handleZoomImage = handleZoomImage
        // console.log(this._handleZoomImage);
    }
    
    _createPlace() {
        //Клонируем блок кода из темплэйт контейнера
        const createNewCard = this._templatePlace.content.querySelector('.place').cloneNode(true);        
        // console.log(createNewCard);
        return createNewCard;   
    }
    
    //Функция удаляющая карточки со страницы
    _handleCardDelete = () => {
        this._cloneElement.remove();
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
        this._titlePlace.textContent = this._name;
        this._imagePlace.src = this._src;
        this._imagePlace.alt = this._name;
        this._setEventListener()
        return this._cloneElement;
    }
}