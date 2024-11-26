import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submit = submitFunction;
    this._formElement = this._selector.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(".popup__input");

    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    super.close();

    this._formElement.reset();
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._submit(this._getInputValues());

      this.close();
    });

    super.setEventListeners();
  }
}
