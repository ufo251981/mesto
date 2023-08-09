export default class Section{
  constructor({items, renderer}, containerSelector) {
    this._initialCard = items;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addCard() {
    this._initialCard.forEach(element => {
      this.addItem(this.renderer(element));
    })
  }

  addItem(domElement) {
    this._container.prepend(domElement);
  }
}