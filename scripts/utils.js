import {
  editButton,
  closePopupButton,
  popup,
  addButton,
  popupAdd,
  closeAddPopup,
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
