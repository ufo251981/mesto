export default class Section{
  constructor({items, renderer}, containerSelector) {
    this._initialCard = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addCards() {
    this._initialCard.forEach(element => {
      this._renderer(element);
    })
  }

  render(data) {
    this._renderer(data);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}