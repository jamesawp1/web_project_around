const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close-button");

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
  let nameInput = document.querySelector("#input-name");
  let jobInput = document.querySelector("#input-job");
  const profileName = document.querySelector(".profile__title");
  const profileJob = document.querySelector(".profile__subtitle");
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.toggle("popup_opened");
}
formElement.addEventListener("submit", handleProfileFormSubmit);

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

function renderCard(card) {
  const cardClone = cardElement.cloneNode(true);

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

  return cardClone;
}

const gallery = document.querySelector(".gallery");
initialCards.forEach((card, index) => {
  const cardItem = renderCard(card);
  gallery.append(cardItem);
});
