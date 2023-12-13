import { useEffect, useState } from "react"
import api from "../../utils/api"

function LikeButton({ likes, adminId, cardId }) {
  const [isLike, setIsLike] = useState(false)
  const [counter, setCounter] = useState(likes.length)

  useEffect(() => {
    setIsLike(likes.some(element => adminId === element._id))
  },[likes, adminId])

  function handleCardLike() {
    if (isLike) {
      api.deleteLike(cardId)
      .then(res => {
        setIsLike(false)
        setCounter(res.likes.length)
      })
      .catch((err) => console.error(`Ошибка при удалении лайка ${err}`))
    }else{
      api.addLike(cardId)
      .then(res => {
        setIsLike(true)
        setCounter(res.likes.length)
      })
      .catch((err) => console.error(`Ошибка при постановке лайка ${err}`))
    }
  }

 return(
  <>
    <button type="button" className={`place__like ${isLike ? 'place__like_active' : ''}`} onClick={handleCardLike}/>
    <p className="place__like-number">{counter}</p>
  </>
 )
}

export default LikeButton