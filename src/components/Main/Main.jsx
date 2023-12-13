import { useContext } from "react";

import Card from "../Card/Card.jsx"
import CurrentUserContext from "../../contexts/CurrentUserContext.js";


function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDelete, 
  cards}) {
  
  const currentUser = useContext(CurrentUserContext)

  return(
    <div>
      {/*Основной контент*/}
      <main className="main">
        {/*Основной блок*/}
        <section className="profile">
          <div className="profile__image-after" onClick={onEditAvatar}>
            <img src={currentUser.avatar ? currentUser.avatar : "#"} alt="Аватар профиля" className="profile__image" />
          </div>
          <div className="profile__label">
            <h1 className="profile__info">{currentUser.name ? currentUser.name : ""}</h1>
           <button onClick={onEditProfile} className="profile__edit-button" type="button"></button>
         </div>
         <p className="profile__text">{currentUser.about ? currentUser.about : ""}</p>
          <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
       </section>
       {/*Блок с фото мест*/}
       <section aria-label="Grid-photo" className="places">
          {cards.map(data => {
            return(
            <div id="place" className="place" key={data._id}>
              <Card card={data} onCardClick={onCardClick} onCardDelete={onDelete}/>
            </div>)
          })}
        
       </section>
     </main>
      
</div>
    
  )
}

export default Main