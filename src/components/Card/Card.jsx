import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import LikeButton from "../LikeButton/LikeButton";

function Card ({card, onCardClick, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext)
 
  return(
    <article>
      <div className="place__image-block">
        <img className="place__image" 
        alt={card.name} 
        src={card.link} 
        onClick={() => onCardClick({link: card.link, name: card.name})}/>
        {currentUser._id === card.owner._id && <button type="button" className="place__delete-button" onClick={() => onCardDelete(card._id)}/>}        
      </div>
      <div className="place__name">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-container">
          <LikeButton likes={card.likes} adminId={currentUser._id} cardId={card._id} />
        </div>
      </div>
    </article>

  )
}

export default Card