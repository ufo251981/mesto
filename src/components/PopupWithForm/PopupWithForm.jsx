function PopupWithForm({name, buttonTitle, title, isOpen, onClose, children, onSubmit, isSending, isValid=true}) {
// console.log(isValid)
  return(
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
    <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
      <button className="popup__button popup__button-close" onClick={onClose} type="button" />
      <h2 className={`popup__title ${name === 'delete-card' ? 'popup__title_type-delete' : ''}`}>{title}</h2>
      <form
        name={name}
        className={`popup__form popup__form_${name}`}
        noValidate
        onSubmit={onSubmit}
      >
        {children}
      <button
          type="submit"
          value="Сохранить"
          disabled={isSending}
          className={`popup__button-save ${isValid ? '' : 'popup__button-save_disabled'}`}
        >
          {isSending ? `${buttonTitle}...` : buttonTitle}
        </button>
      </form>
    </div>
  </div>
  )
}

export default PopupWithForm