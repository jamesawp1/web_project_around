//Funções que compõem o sistema de validação das entradas dos formulários
//
//mostra aviso de erro
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

//esconde aviso de erro
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

//função que decide o quando a msg de erro deve ou não aparecer
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

//verifica se a propriedade valid de um dos itens do array de inputs é falso
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//muda o estado do botão com base na função hasValidInput
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

//executa e dá corpo a todo o aparato acima. Ou seja, como o nome diz, habilita a verificação
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
