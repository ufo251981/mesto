import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSending }) {
  const {values, errors, isValid, isValidInput, handleChange, reset} = useFormValidation()
  const input = useRef()
  
  function resetOnClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({avatar: input.current.value}, reset)
  }

  return(
    <PopupWithForm
          name="change-avatar"
          title="Обновить аватар"
          buttonTitle="Сохранить"
          isOpen={isOpen}
          onClose={resetOnClose}
          isValid={isValid}
          isSending={isSending}
          onSubmit={handleSubmit}
        >
          <div className="popup__input-container">
            <input
              ref={input}
              id="avatar"
              type="url"
              required
              name="avatar"
              placeholder="Ссылка на картинку"
              className={`popup__input popup__input_avatar_link ${isValidInput.avatar === undefined || isValidInput.avatar ? '' : "popup__input_error_active"}`}
              value={values.avatar ? values.avatar : ''}
              disabled={isSending}
              onChange={handleChange}
            />
            <span className="popup__error popup-error-avatar">{errors.avatar}</span>
          </div>
        </PopupWithForm>
  )
}

export default EditAvatarPopup