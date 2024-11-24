import Popup from "./Popup.js";

class PopupWithForm extends Popup {
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
}
