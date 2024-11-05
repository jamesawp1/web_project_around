class FormValidator {
  constructor(selectors, form) {
    this._formElement = selectors.formElement;
    this._inputElement = selectors.inputElement;
    this._inputError = selectors.inputError;
    this._errorVisible = selectors.errorVisible;
    this._errorMessage = selectors.errorMessage;
  }
}
