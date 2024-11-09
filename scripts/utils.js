import {
  editButton,
  closePopupButton,
  popup,
  addButton,
  popupAdd,
  closeAddPopup,
  allPopups,
} from "./index.js";

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
});
