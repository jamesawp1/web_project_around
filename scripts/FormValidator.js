export class FormValidator {
  constructor(selectors, form) {
    this._inputElement = selectors.inputSelector;
    this._buttonElement = selectors.submitButtonSelector;
    this._buttonInactive = selectors.inactiveButtonClass;
    this._inputError = selectors.inputErrorClass;
    this._errorVisible = selectors.errorClass;
    this._formElement = form;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;

    console.log(errorElement);
    inputElement.classList.add(`${this._inputError}`);
    errorElement.classList.add(`${this._errorVisible}`);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    console.log(errorElement);
    inputElement.classList.remove(`${this._inputError}`);
    errorElement.classList.remove(`${this._errorVisible}`);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      const inputValidationMessage = inputElement.validationMessage;
      this._showInputError(inputElement, inputValidationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(`${this._buttonInactive}`);
    } else {
      button.classList.remove(`${this._buttonInactive}`);
    }
  }

  _validateInputs() {
    const inputs = Array.from(
      this._formElement.querySelectorAll(`${this._inputElement}`)
    );

    const buttonElement = this._formElement.querySelector(
      `${this._buttonElement}`
    );

    this._toggleButtonState(inputs, buttonElement);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputs, buttonElement);
      });
    });
  }

  enableValidation() {
    this._validateInputs();
  }
}
