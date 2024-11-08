import { Card } from "./Card.js";

export const editButton = document.querySelector(".profile__edit-button");
export const popup = document.querySelector(".popup");
export const closePopupButton = document.querySelector(".popup__close-button");

//Variáveis usadas no listener que abre e fecha o popup que adiciona mais cards
export const addButton = document.querySelector(".profile__add-button");
export const popupAdd = document.querySelector(".popup-add-card");
export const closeAddPopup = document.querySelector(
  ".popup-add-card__close-button"
);

//Variável que engloba um array contendo todos os popups
export const allPopups = Array.from(document.querySelectorAll(".popup"));

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

//Adiciona um card com base nas informações inseridas pelo usuário
const placeTitle = document.querySelector("#input-place-title");
const placeUrl = document.querySelector("#input-place-url");
const addCardForm = document.querySelector(".popup__form-add-card");
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const userCards = {
    name: placeTitle.value,
    link: placeUrl.value,
  };

  const newCard = new Card(userCards, "#template");

  const cardElementUser = newCard.generateCard();

  document.querySelector(".gallery").prepend(cardElementUser);

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

initialCards.forEach((item) => {
  const card = new Card(item, "#template");

  const cardElement = card.generateCard();

  document.querySelector(".gallery").append(cardElement);
});

/*imageItem.addEventListener("click", () => {
  popupViewImg.classList.toggle("popup_opened");
  popupViewImg.querySelector(".popup-view-image__image").src = card.link;
  popupViewImg.querySelector(".popup-view-image__image").alt = card.name;
  popupViewImg.querySelector(".popup-view-image__title").textContent =
    card.name;
});*/
//Váriavel usada para abrir a imagem
const popupViewImg = document.querySelector(".popup-view-image");

//eventListener para fechar a imagem
const closeImage = document.querySelector(".popup-view-image__close-button");
closeImage.addEventListener("click", () => {
  popupViewImg.classList.remove("popup_opened");
});
