export default class Popup {
  constructor(popupSelector) {
    this._selector = document.querySelector(popupSelector);
  }

  open() {
    this._selector.classList.add("popup_opened");
  }

  close() {
    this._selector.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._selector
      .querySelector(".popup__close-button")
      .addEventListener("click", () => {
        this.close();
      });

    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });

    document.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
