class Section {
  constructor({ items, renderer }, targetSelector) {
    this._items = items;
    this._renderer = renderer;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
