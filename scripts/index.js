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
  changepicturePopup,
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
    pictureSelector: ".profile__image",
  });

  initialUserInfo.setUserInfo(data);

  ownerId = data._id;
});

//Adiciona cards iniciais junto da classe necessária para abrir a imagem dos cards
const popupWithImage = new PopupWithImage(".popup-view-image");

//delte
async function handleDelete(cardItem, evt) {
  return api
    .deleteUserCard(cardItem._id)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`ERROR: ${res.status}`);
    })
    .then(() => {
      evt.target.closest(".gallery__card").remove();
    })
    .catch((err) => {
      console.log(`ERRO NA EXCLUSÃO DO CARTÃO: ${err}`);
    });
}

function handleLike(cardItem, evt) {
  if (cardItem.isLiked) {
    return (
      api.deleteLikeUserCard(cardItem._id) &&
      evt.target.setAttribute("src", "./images/button__icon.svg")
    );
  } else if (!cardItem.isLiked) {
    return (
      api.putLikeUserCard(cardItem._id) &&
      evt.target.setAttribute("src", "./images/button__icon_active.svg")
    );
  }
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
          },
          {
            handleLikeButtonClick: (evt) => {
              handleLike(item, evt);
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
        handleDeleteCard: (evt) => {
          handleDelete(formData, evt);
        },
      },
      {
        handleLikeButtonClick: (evt) => {
          handleLike(formData, evt);
        },
      }
    );

    const cardElement = card.generateCard();
    cardRenderer.addItem(cardElement);

    popupAddCard.saveButtonContentSaving();

    api
      .postUserCard(formData)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(`ERRO NO ENVIO DO CARTÃO À API: ${err}`);
      })
      .finally(() => {
        popupAddCard.saveButtonContentSave();
      });
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

  popupEditCard.saveButtonContentSaving();

  api
    .patchUserInfo(formData)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`ERROR: ${res.status}`);
    })
    .catch((err) => {
      console.log(`ERRO NA INSERÇÃO DAS INFORMAÇÕES DE PERFIL: ${err}`);
    })
    .finally(() => {
      popupEditCard.saveButtonContentSave();
    });
});
popupEditCard.setEventListeners();

//Obtem os seletores de informações do perfil
const initialUser = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  pictureSelector: ".profile__image",
});

//Recupera o conteúdo do que estiver gravado nos seletores de initialUser e os repassa para o formulário
editButton.addEventListener("click", () => {
  const info = initialUser.getUserInfo();
  document.querySelector("#input-name").value = info.nameTitle;
  document.querySelector("#input-job").value = info.jobTitle;
  popup.classList.toggle("popup_opened");
});

//Altera a fotografia de perfil
const popupPicture = new PopupWithForm(".popup-profile-picture", (formData) => {
  popupPicture.saveButtonContentSaving();

  api
    .patchPicProfile(formData)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((userData) => {
      initialUser.setUserInfo(userData);
    })
    .catch((err) => {
      console.log(`ERRO AO MUDAR A FOTOGRAFIA DE PERFIL: ${err}`);
    })
    .finally(() => {
      popupPicture.saveButtonContentSave();
    });
});
popupPicture.setEventListeners();

changepicturePopup.addEventListener("click", () => {
  popupPicture.open();
});
