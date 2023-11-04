import { useEffect, useState } from "react"
import api from "../../utils/api.js"
import Card from "../Card/Card.jsx"


function Main(props) {

  const [userName, setUserName] = useState('')
  const [userDiscription, setUserDiscription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, cardData]) => {
        setUserName(dataUser.name)
        setUserDiscription(dataUser.about)
        setUserAvatar(dataUser.avatar)
        cardData.forEach(data => data.adminId = dataUser._id)
        setCards(cardData)
      })
      .catch((error) => console.error(`Ошибка при отрисовки карточек с сервера ${error}`))
  },[])

  return(
    <div>
      {/*Основной контент*/}
      <main className="main">
        {/*Основной блок*/}
        <section className="profile">
          <div className="profile__image-after" onClick={props.onEditAvatar}>
            <img src={userAvatar} alt="" className="profile__image" />
          </div>
          <div className="profile__label">
            <h1 className="profile__info">{userName}</h1>
           <button onClick={props.onEditProfile} className="profile__edit-button" type="button"></button>
         </div>
         <p className="profile__text">{userDiscription}</p>
          <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
       </section>
       {/*Блок с фото мест*/}
       <section aria-label="Grid-photo" className="places">
          {cards.map(data => {
            return(
            <div id="place" className="place" key={data._id}>
              <Card card={data} onCardClick={props.onCardClick}/>
            </div>)
          })}
        
       </section>
     </main>
      
</div>
    
  )
}

export default Main