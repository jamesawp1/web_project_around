import {
  editButton,
  closePopupButton,
  popup,
  addButton,
  popupAdd,
  closeAddPopup,
  allPopups,
} from "./index.js";

/*
//Abre e fecha o popup de edição de nome e profissão
editButton.addEventListener("click", function () {
  popup.classList.toggle("popup_opened");
});
closePopupButton.addEventListener("click", function () {
  popup.classList.toggle("popup_opened");
});

//Abre e fecha o popup que permite adicionar mais cards
addButton.addEventListener("click", () => {
  popupAdd.classList.toggle("popup_opened");
});
closeAddPopup.addEventListener("click", () => {
  popupAdd.classList.toggle("popup_opened");
});

////Ouvinte de evento do tipo 'click' que fecha os respectivos popups com a classe 'popup'
allPopups.forEach((pop) => {
  pop.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      pop.classList.remove("popup_opened");
    }
  });
});

document.addEventListener("keydown", (evt) => {
  allPopups.forEach((pop) => {
    if (evt.key === "Escape") {
      pop.classList.remove("popup_opened");
    }
  });
});*/

//funcao responsavel pelo submit dos inputs
/*function handleProfileFormSubmit(evt) {
  const nameInput = document.querySelector("#input-name");
  const jobInput = document.querySelector("#input-job");
  const profileName = document.querySelector(".profile__title");
  const profileJob = document.querySelector(".profile__subtitle");
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.toggle("popup_opened");
}*/

addButton.addEventListener("click", () => {
  popupAdd.classList.toggle("popup_opened");
});

editButton.addEventListener("click", function () {
  popup.classList.toggle("popup_opened");
});
