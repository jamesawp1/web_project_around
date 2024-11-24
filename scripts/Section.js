class Section {
  constructor({ items, renderer }, targetSelector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = targetSelector;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._selector.append(element);
  }
}
