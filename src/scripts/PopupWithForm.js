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

    return this._formValues;
  }

  close() {
    super.close();

    this._selector.querySelector(".popup__form").reset();
  }

  open() {
    super.open();
  }

  saveButtonContentSaving() {
    this._selector.querySelector(".popup__button").textContent = "Salvando...";
  }

  saveButtonContentSave() {
    this._selector.querySelector(".popup__button").textContent = "Salvar";
  }

  setEventListeners() {
    super.setEventListeners();

    this._selector.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());

      this._selector
        .querySelector(".popup__button")
        .classList.add("popup__button_disabled");
    });
  }
}
