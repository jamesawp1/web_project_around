import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";

import {
  editButton,
  popup,
  addButton,
  popupAdd,
  initialCards,
  profileName,
  profileJob,
} from "./utils.js";

//Instância da API
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "3c8f21ec-ac73-4a15-93c1-17876f04bb91",
    "Content-Type": "application/json",
  },
});

//Informações do usuário iniciais
let ownerId;
api.getUserInfo().then((data) => {
  const initialUserInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__subtitle",
  });

  initialUserInfo.setUserInfo(data);

  ownerId = data._id;
});

//Adiciona cards iniciais junto da classe necessária para abrir a imagem dos cards
const popupWithImage = new PopupWithImage(".popup-view-image");

//delte
async function handleDelete(cardItem, evt) {
  return api.deleteUserCard(cardItem._id).then(() => {
    evt.target.closest(".gallery__card").remove();
  });
}

api.getInitialCards().then((cards) => {
  const cardRenderer = new Section(
    {
      items: cards,
      renderer: (item) => {
        const card = new Card(
          item,
          "#template",
          {
            handleCardClick: () => {
              popupWithImage.setEventListeners(item);
            },
          },
          {
            handleDeleteCard: (evt) => {
              handleDelete(item, evt);
            },
          }
        );

        const cardElement = card.generateCard();
        cardRenderer.addItem(cardElement);
      },
    },

    ".gallery"
  );

  cardRenderer.renderItems();
  //

  const popupAddCard = new PopupWithForm(".popup-add-card", (formData) => {
    const card = new Card(
      formData,
      "#template",
      {
        handleCardClick: () => {
          popupWithImage.setEventListeners(formData);
        },
      },
      {
        handleDeleteClick: () => {
          handleDelete(formData, cardElement);
        },
      }
    );

    const cardElement = card.generateCard();
    cardRenderer.addItem(cardElement);

    api.postUserCard(formData);
  });
  popupAddCard.setEventListeners();
});

//Validação
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const forms = Array.from(document.querySelectorAll(".popup__form"));
forms.forEach((item) => {
  const formValidate = new FormValidator(config, item);
  formValidate.enableValidation();
});

//Popup que adiciona outros cards

//Adiciona informações do usuário à página
const popupEditCard = new PopupWithForm(".popup-edit-profile", (formData) => {
  const user = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__subtitle",
  });

  user.setUserInfo(formData);

  api.patchUserInfo(formData);
});
popupEditCard.setEventListeners();

//Obtem os seletores de informações do perfil
const initialUser = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

//Recupera o conteúdo do que estiver gravado nos seletores de initialUser e os repassa para o formulário
editButton.addEventListener("click", () => {
  const info = initialUser.getUserInfo();
  document.querySelector("#input-name").value = info.nameTitle;
  document.querySelector("#input-job").value = info.jobTitle;
  popup.classList.toggle("popup_opened");
});
