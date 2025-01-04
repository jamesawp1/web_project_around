import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";

import { editButton, popup, changepicturePopup } from "./utils.js";

//Instância da API
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "3c8f21ec-ac73-4a15-93c1-17876f04bb91",
    "Content-Type": "application/json",
  },
});

//Informações iniciais do usuário
let ownerId;

api
  .getInitialUserInfo()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    Promise.reject(`ERROR: ${res.status}`);
  })
  .then((dados) => {
    const initialUserInfo = new UserInfo(
      ".profile__title",
      ".profile__subtitle",
      ".profile__image"
    );
    initialUserInfo.setUserInfoWithAvatar(dados);

    ownerId = dados._id;
  })
  .catch((err) => {
    console.log(`ERRO NA OBTENÇÃO DAS INFORMAÇÕES DE PERFIL: ${err}`);
  });

//Funções que integram ações junto aos cartões
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

function addLike(cardItem) {
  cardItem.isLiked = true;
  //evt.target.setAttribute("src", "./images/button__icon_active.svg");
  return api
    .putLikeUserCard(cardItem._id)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`ERROR: ${res.status}`);
    })
    .catch((err) => {
      console.log(`ERRO NO CURTIR DO CARTÃO: ${err}`);
    });
}

function removeLike(cardItem) {
  //evt.target.setAttribute("src", "./images/button__icon_active.svg");
  return api
    .deleteLikeUserCard(cardItem._id)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`ERROR: ${res.status}`);
    })
    .catch((err) => {
      console.log(`ERRO NO DESCURTIR DO CARTÃO: ${err}`);
    });
}

//Classe necessária para abrir a imagem dos cards
const popupWithImage = new PopupWithImage(".popup-view-image");

api
  .getInitialCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    Promise.reject(`ERROR: ${res.status}`);
  })
  .then((cards) => {
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
              handleLikeButton: () => {
                addLike(item);
              },
            },
            {
              handleDislikeButton: () => {
                removeLike(item);
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
      api
        .postUserCard(formData)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((item) => {
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
              handleLikeButton: () => {
                addLike(item);
              },
            },
            {
              handleDislikeButton: () => {
                removeLike(item);
              },
            }
          );
          const cardElement = card.generateCard();

          popupAddCard.saveButtonContentSaving();

          cardRenderer.addItem(cardElement);
        })
        .catch((err) => {
          console.log(`ERRO NO ENVIO DO CARTÃO À API: ${err}`);
        })
        .finally(() => {
          popupAddCard.saveButtonContentSave();
        });
    });
    popupAddCard.setEventListeners();
  })
  .catch((err) => {
    console.log(`ERRO NO CARREGAMENTO INICIAL DOS CARTÕES: ${err}`);
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

//Adiciona informações (de texto) do usuário à página
const popupEditCard = new PopupWithForm(".popup-edit-profile", (formData) => {
  const user = new UserInfo(".profile__title", ".profile__subtitle");

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

//Obtem os seletores que contém as informações (texto) do perfil
const initialUser = new UserInfo(".profile__title", ".profile__subtitle");

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
      document
        .querySelector(".profile__image")
        .setAttribute("src", userData.avatar);
    })
    .catch((err) => {
      console.log(`ERRO AO MUDAR A FOTOGRAFIA DE PERFIL: ${err}`);
    })
    .finally(() => {
      popupPicture.saveButtonContentSave();
    });
});
popupPicture.setEventListeners();
//Abre o popup que altera a foto de perfil
changepicturePopup.addEventListener("click", () => {
  popupPicture.open();
});
