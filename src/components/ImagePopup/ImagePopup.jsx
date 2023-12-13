function ImagePopup(props) {
  return(
  <div className={`popup popup_zoom ${props.isOpen && 'popup_opened'}`} onClick={props.onClose} >
    <figure className="popup__figure"onClick={(evt => evt.stopPropagation())}>
      <button className="popup__button popup__button-close popup__button-close-zoom"
        type="button"
        onClick={props.onClose}
        />
      <img alt={props.card.name ? props.card.name : "#"}
      src={props.card.link ? props.card.link : "#"} 
      className="popup__image"/>
      <figcaption className="popup__image-text">{props.card.name}</figcaption>
    </figure>
  </div>)
}

export default ImagePopup