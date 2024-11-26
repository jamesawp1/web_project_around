import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._selector.querySelectorAll(".popup__input");

    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    console.log(this._formValues);
    return this._formValues;
  }

  close() {
    super.close();

    /*this._selector.reset();*/
  }

  setEventListeners() {
    this._selector.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());

      /*this.close();*/
    });

    super.setEventListeners();
  }
}
