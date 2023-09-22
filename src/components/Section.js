export default class Section{
  constructor(renderer, containerSelector) {
    // this._initialCard = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addCards(dataCard) {
    dataCard.forEach(element => {
      this._renderer(element);
    })
  }
 
  addItem(element) {
    this._container.prepend(element);
  }
}