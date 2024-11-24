class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
  }

  open() {
    this._selector.classList.add("popup_opened");
  }

  close() {
    this._selector.classList.remove("popup_opened");
  }
}
