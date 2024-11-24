import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(item) {
    this._selector.querySelector(".popup-view-image__image").src = item.link;
    this._selector.querySelector(".popup-view-image__image").alt = item.name;
    this._selector.querySelector(".popup-view-image__title").textContent =
      item.name;

    super.open();
  }
}
