export default class Section{
  constructor({items, renderer}, containerSelector) {
    this._initialCard = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addCards() {
    this._initialCard.forEach(element => {
      this.addItem(element);
    })
  }

  addItem(data) {
    this._container.prepend(this._renderer(data));
  }
}