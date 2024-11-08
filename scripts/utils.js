import {
  editButton,
  closePopupButton,
  popup,
  addButton,
  popupAdd,
  closeAddPopup,
  allPopups,
  cardImages,
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
      pop.classList.remove("popup_opened");
      pop.classList.remove("popup_opened");
    }
  });
});

//Método que itera pelas imagens dos cards adicionando a funcionalidade de abrí-las em 'tela cheia'
cardImages.forEach((image) => {
  const popupViewImg = document.querySelector(".popup-view-image");
  image.addEventListener("click", (evt) => {
    popupViewImg.classList.toggle("popup_opened");
    popupViewImg.querySelector(".popup-view-image__image").src = evt.target.src;
    popupViewImg.querySelector(".popup-view-image__image").alt = evt.target.alt;
    popupViewImg.querySelector(".popup-view-image__title").textContent =
      evt.target.alt;
  });

  const closePopupImage = popupViewImg.querySelector(
    ".popup-view-image__close-button"
  );
  closePopupImage.addEventListener("click", () => {
    popupViewImg.classList.remove("popup_opened");
  });
});
