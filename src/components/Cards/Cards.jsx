function Cards({card, onCardClick}) {
  return(
    <article>
      <div className="place__image-block">
        <img className="place__image" 
        alt={card.name} 
        src={card.link} 
        onClick={() => onCardClick({link: card.link, name: card.name})}/>
        <button type="button" className="place__delete-button" />
      </div>
      <div className="place__name">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-container">
          <button type="button" className="place__like" />
          <p className="place__like-number" />
        </div>
      </div>
    </article>

  )
}

export default Cards