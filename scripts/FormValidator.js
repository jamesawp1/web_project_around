const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formElements = document.querySelectorAll(".popup__form");

class FormValidator {
  constructor(selectors, form) {
    this._formElement = form;
    this._inputElement = selectors.inputSelector;
    this._buttonElement = selectors.submitButtonSelector;
    this._buttonInactive = selectors.inactiveButtonClass;
    this._inputError = selectors.inputErrorClass;
    this._errorVisible = selectors.errorClass;
  }

  _showInputError() {
    this._errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    );
    this._inputElement.classList.add(`${this._inputError}`);
    this._errorElement.textContent = this._errorMessage;
    this._errorElement.classList.add(`${this._errorVisible}`);
  }

  _hideInputError() {
    this._errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    );
    this._inputElement.classList.remove(`${this._inputError}`);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(`${this._errorVisible}`);
  }

  _checkInputValidity() {
    if (!this._inputElement.validity.valid) {
      showInputError();
    } else {
      hideInputError();
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, button, buttonInactive) {
    const buttonElements = document.querySelectorAll(`${button}`);
    buttonElements.forEach((buttonElement) => {
      if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(`${buttonInactive}`);
      } else {
        buttonElement.classList.remove(`${buttonInactive}`);
      }
    });
  }
}
