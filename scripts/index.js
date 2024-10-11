const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close-button");
const popupInput = document.querySelectorAll(".popup__input");

//Abre e fecha o popup de edição de nome e profissão
editButton.addEventListener("click", function () {
  popup.classList.toggle("popup_opened");
});
closePopupButton.addEventListener("click", function () {
  popup.classList.toggle("popup_opened");
});

//Função que permite o usuário alterar o nome e profissão
const formElement = document.querySelector(".popup__form");
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector("#input-name");
  const jobInput = document.querySelector("#input-job");
  const profileName = document.querySelector(".profile__title");
  const profileJob = document.querySelector(".profile__subtitle");
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.toggle("popup_opened");
}
formElement.addEventListener("submit", handleProfileFormSubmit);

//Abre e fecha o popup que permite adicionar mais cards
const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup-add-card");
const closeAddPopup = document.querySelector(".popup-add-card__close-button");
addButton.addEventListener("click", () => {
  popupAdd.classList.toggle("popup_opened");
});
closeAddPopup.addEventListener("click", () => {
  popupAdd.classList.toggle("popup_opened");
});

//Adiciona um card com as informações inseridas pelo usuário
const placeTitle = document.querySelector("#input-place-title");
const placeUrl = document.querySelector("#input-place-url");
const addCardForm = document.querySelector(".popup__form-add-card");
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newCard = renderCard({
    name: placeTitle.value,
    link: placeUrl.value,
  });

  gallery.prepend(newCard);

  placeTitle.value = "";
  placeUrl.value = "";

  popupAdd.classList.toggle("popup_opened");
});

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const template = document.querySelector("#template").content;
const cardElement = template.querySelector(".gallery__card");

//Função que faz um card aparecer
function renderCard(card) {
  const cardClone = cardElement.cloneNode(true);
  const imageItem = cardClone.querySelector(".gallery__card-image");

  cardClone.querySelector(".gallery__card-name").textContent = card.name;

  cardClone
    .querySelector(".gallery__card-image")
    .setAttribute("src", card.link);

  cardClone
    .querySelector(".gallery__card-image")
    .setAttribute("alt", card.name);

  //Exclui o card
  const deleteButton = cardClone.querySelector(".gallery__delete-icon");
  deleteButton.addEventListener("click", () => {
    deleteButton.closest(".gallery__card").remove();
  });

  //Alterna o valor do atributo do botão de "curtir"
  cardClone
    .querySelector(".gallery__like-icon")
    .addEventListener("click", (evt) => {
      if (evt.target.getAttribute("src") === "./images/button__icon.svg") {
        return evt.target.setAttribute(
          "src",
          "./images/button__icon_active.svg"
        );
      }
      return evt.target.setAttribute("src", "./images/button__icon.svg");
    });

  imageItem.addEventListener("click", () => {
    popupViewImg.classList.toggle("popup_opened");
    popupViewImg.querySelector(".popup-view-image__image").src = card.link;
    popupViewImg.querySelector(".popup-view-image__image").alt = card.name;
    popupViewImg.querySelector(".popup-view-image__title").textContent =
      card.name;
  });

  return cardClone;
}

//Faz os cards iniciais aparecerem, com base nas informações listadas no objeto inicialCards
const gallery = document.querySelector(".gallery");
initialCards.forEach((card, index) => {
  const cardItem = renderCard(card);
  gallery.append(cardItem);
});

//Váriavel usada para abrir a imagem
const popupViewImg = document.querySelector(".popup-view-image");

//eventListener para fechar a imagem
const closeImage = document.querySelector(".popup-view-image__close-button");
closeImage.addEventListener("click", () => {
  popupViewImg.classList.remove("popup_opened");
});

//Listener que altera aparencia do botão salvar caso as condições sejam 'ok'
popupInput.forEach((input) => {
  input.addEventListener("input", (evt) => {
    const buttonElement = popup
      .querySelectorAll(".popup__save-button")
      .forEach((button) => {
        if (!input.validity.valid) {
          button.classList.add("popup__save-button-disabled");
        } else {
          button.classList.remove("popup__save-button-disabled");
        }
      });
  });
});

//Ouvintes de evento do tipo 'click' que fecham os respectivso popups
popup.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    popup.classList.remove("popup_opened");
  }
});

popupViewImg.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    popupViewImg.classList.remove("popup_opened");
  }
});

popupAdd.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    popupAdd.classList.remove("popup_opened");
  }
});

//Ouvinte que fecha os popups quando a tecla esc foir pressionada
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    popup.classList.remove("popup_opened");
    popupViewImg.classList.remove("popup_opened");
    popupAdd.classList.remove("popup_opened");
  }
});

const showInputError = (
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

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
    }
  };

  const forms = Array.from(document.querySelectorAll(`${formSelector}`));
  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(`${inputSelector}`));

    inputs.forEach((input) => {
      input.addEventListener("input", () => {});
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
