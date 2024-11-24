export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
  }

  open() {
    this._selector.classList.add("popup_opened");
  }

  close() {
    this._selector.classList.remove("popup_opened");
  }

  _handleEscClose() {
    this._selector.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this._selector.classList.remove("popup_opened");
      }
    });
  }

  setEventListeners() {
    this._selector
      .querySelector(".popup__close-button")
      .addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup")) {
          this._selector.classList.remove("popup_opened");
        }

        this._selector.classList.remove("popup_opened");
      });
  }
}
