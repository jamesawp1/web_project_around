class FormValidator {
  constructor(selectors, form) {
    this._formElement = selectors.formElement;
    this._inputElement = selectors.inputElement;
    this._inputError = selectors.inputError;
    this._errorVisible = selectors.errorVisible;
    this._errorMessage = selectors.errorMessage;
  }

  _showInputError = () => {
    this._errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    );
    this._inputElement.classList.add(`${this._inputError}`);
    this._errorElement.textContent = this._errorMessage;
    this._errorElement.classList.add(`${this._errorVisible}`);
  };

  _hideInputError = () => {
    this._errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    );
    this._inputElement.classList.remove(`${this._inputError}`);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(`${this._errorVisible}`);
  };
}
