import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(submitFunction, popupSelector) {
    super(popupSelector);
    this._submit = submitFunction;
  }

  _getInputValues() {
    this._inputList = this._selector.querySelectorAll(".popup__input");

    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    this._selector.reset();

    super.close();
  }

  setEventListeners() {
    this._selector.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._submit();
    });

    this._selector
      .querySelector(".popup__close-button")
      .addEventListener("click", () => {
        this.close();
      });
  }
}
