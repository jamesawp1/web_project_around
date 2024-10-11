//Funções que compõem o sistema de validação das entradas dos formulários
const showInputError = (
  formElement,
  inputElement,
  inputError,
  errorVisible,
  errorMessage
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputError}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorVisible}`);
};

const hideInputError = (
  formElement,
  inputElement,
  inputError,
  errorVisible
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${inputError}`);
  errorElement.textContent = "";
  errorElement.classList.remove(`${errorVisible}`);
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputError,
  errorVisible
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputError,
      errorVisible,
      inputElement.validationMessage
    );
  } else {
    hideInputError(formElement, inputElement, inputError, errorVisible);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, button, buttonInactive) => {
  const buttonElements = document.querySelectorAll(`${button}`);
  buttonElements.forEach((buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${buttonInactive}`);
    } else {
      buttonElement.classList.remove(`${buttonInactive}`);
    }
  });
};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const forms = Array.from(document.querySelectorAll(`${formSelector}`));
  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(`${inputSelector}`));

    inputs.forEach((input) => {
      toggleButtonState(inputs, submitButtonSelector, inactiveButtonClass);
      input.addEventListener("input", () => {
        checkInputValidity(form, input, inputErrorClass, errorClass);
        toggleButtonState(inputs, submitButtonSelector, inactiveButtonClass);
      });
    });
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
