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

  setEventListeners() {
    this._selector.addEventListener("submit", () => {
      evt.preventDefault();

      this._selector.querySelector;
    });
    function handleProfileFormSubmit(evt) {
      const nameInput = document.querySelector("#input-name");
      const jobInput = document.querySelector("#input-job");
      const profileName = document.querySelector(".profile__title");
      const profileJob = document.querySelector(".profile__subtitle");
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
      popup.classList.toggle("popup_opened");
    }
  }
}
