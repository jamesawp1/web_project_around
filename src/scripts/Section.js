export default class Section {
  constructor({ items, renderer }, targetSelector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(targetSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._selector.prepend(element);
  }
}
