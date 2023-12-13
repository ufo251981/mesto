import { useEffect, useContext } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import CurrentUserContext from "../../contexts/CurrentUserContext"

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSending }) {
  
  const { values, errors, isValid, isValidInput, handleChange, reset, setValue } = useFormValidation()
  const currentUser = useContext(CurrentUserContext)
  console.log(values);
  
  useEffect(() => {
    setValue("profilename", currentUser.name)
    setValue("profiletext", currentUser.about)
  },[currentUser, setValue])

  function resetOnClose() {
    onClose()
    reset({profilename: currentUser.name, profiletext: currentUser.about})
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({username: values.profilename, text: values.profiletext}, reset)
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать&nbsp;профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={resetOnClose}
      isValid={isValid}
      isSending={isSending}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          id="username"
          type="text"
          required
          minLength={2}
          maxLength={40}
          name="profilename"
          placeholder="Имя"
          className={`popup__input popup__input_user_name ${isValidInput.profilename === undefined || isValidInput.profilename ? '' : "popup__input_error_active"}`}
          value={values.profilename ? values.profilename : ''}
          disabled={isSending}
          onChange={handleChange}
        />
        <span className="popup__error popup-error-username">{errors.profilename}</span>
      </div>
      <div className="popup__input-container">
        <input
          id="text"
          type="text"
          required
          minLength={2}
          maxLength={200}
          name="profiletext"
          placeholder="О себе"
          className={`popup__input popup__input_user_job ${isValidInput.profiletext === undefined || isValidInput.profiletext ? '' : "popup__input_error_active"}`}
          value={values.profiletext ? values.profiletext : ''}
          disabled={isSending}
          onChange={handleChange}
        />
        <span className="popup__error popup-error-text">{errors.profiletext}</span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup