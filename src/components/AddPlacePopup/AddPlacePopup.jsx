// import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

function AddPlacePopup({isOpen, onClose, onUpdatePlace, isSending}) {
  const {values, errors, isValid, isValidInput, handleChange, reset} = useFormValidation()
  // const input = useRef()

  function resetOnClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdatePlace({title: values.placetitle, link: values.placelink}, reset)
  }

  return(
    <PopupWithForm
      name="add-place"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={isOpen}
      onClose={resetOnClose}
      isValid={isValid}
      isSending={isSending}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          // ref={input}
          id="title"
          type="text"
          required
          minLength={2}
          maxLength={30}
          name="placetitle"
          placeholder="Название"
          className={`popup__input popup__input_place_name ${isValidInput.placetitle === undefined || isValidInput.placetitle ? '' : "popup__input_error_active"}`}
          value={values.placetitle ? values.placetitle : ''}
          disabled={isSending}
          onChange={handleChange}
        />
        <span className="popup__error popup-error-title">{errors.placetitle}</span>
      </div>
      <div className="popup__input-container">
        <input
          // ref={input}
          id="link"
          type="url"
          required
          name="placelink"
          placeholder="Ссылка на картинку"
          className={`popup__input popup__input_place_link ${isValidInput.placelink === undefined || isValidInput.placelink ? '' : "popup__input_error_active"}`}
          value={values.placelink ? values.placelink : ''}
          disabled={isSending}
          onChange={handleChange}
        />
        <span className="popup__error popup-error-link">{errors.placelink}</span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup