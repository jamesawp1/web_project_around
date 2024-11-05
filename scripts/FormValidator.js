const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const forms = document.querySelectorAll(".popup__form");

class FormValidator {
  constructor(selectors, form) {
    this._inputElement = selectors.inputSelector;
    this._buttonElement = selectors.submitButtonSelector;
    this._buttonInactive = selectors.inactiveButtonClass;
    this._inputError = selectors.inputErrorClass;
    this._errorVisible = selectors.errorClass;
    this._formElement = form;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    );
    inputElement.classList.add(`${this._inputError}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._errorVisible}`);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    );
    inputElement.classList.remove(`${this._inputError}`);
    errorElement.textContent = "";
    errorElement.classList.remove(`${this._errorVisible}`);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(inputElement, inputElement.validationMessage);
    } else {
      hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList) {
    const buttonElements = document.querySelectorAll(`${this._buttonElement}`);
    buttonElements.forEach((buttonElement) => {
      if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(`${this._buttonInactive}`);
      } else {
        buttonElement.classList.remove(`${this._buttonInactive}`);
      }
    });
  }

  enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }) {
    forms.forEach((form) => {
      const inputs = Array.from(form.querySelectorAll(`${this._inputElement}`));

      inputs.forEach((input) => {
        toggleButtonState(inputs);
        input.addEventListener("input", () => {
          checkInputValidity(input);
          toggleButtonState(inputs);
        });
      });
    });
  }
}

forms.forEach((item) => {
  const validation = new FormValidator(config, item);

  validation.enableValidation();
});
