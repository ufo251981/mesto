function PopupWithForm(props) {
  return(
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
    <div className="popup__container">
      <button className="popup__button popup__button-close" onClick={props.onClose} type="button" />
      <h2 className="popup__title">{props.title}</h2>
      <form
        name={props.name}
        className="popup__form popup__form_edit-profile"
        noValidate=""
      >
        {props.children}
      <button
          type="submit"
          value="Сохранить"
          className="popup__button-save popup__button-save_new-profile"
        >
          {props.buttonTitle}
        </button>
      </form>
    </div>
  </div>
  )
}

export default PopupWithForm