import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(submitFunction, popupSelector) {
    super(popupSelector);
    this._submit = submitFunction;
  }
}
