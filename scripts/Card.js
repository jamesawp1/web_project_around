export class Card {
  constructor(data, selector, { handleCardClick }) {
    this._text = data.name;
    this._image = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getElement();
    this._setEventListeners();

    this._element.querySelector(".gallery__card-name").textContent = this._text;
    this._element
      .querySelector(".gallery__card-image")
      .setAttribute("src", this._image);
    this._element
      .querySelector(".gallery__card-image")
      .setAttribute("alt", this._text);

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".gallery__delete-button")
      .addEventListener("click", (evt) => {
        this._handleDeleteButtonClick(evt);
      });

    this._element
      .querySelector(".gallery__like-button")
      .addEventListener("click", (evt) => {
        this._handleLikeButtonClick(evt);
      });

    this._element
      .querySelector(".gallery__card-image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  _handleDeleteButtonClick(evt) {
    evt.target.closest(".gallery__card").remove();
  }

  _handleLikeButtonClick(evt) {
    if (evt.target.getAttribute("src") === "./images/button__icon.svg") {
      return evt.target.setAttribute("src", "./images/button__icon_active.svg");
    }
    return evt.target.setAttribute("src", "./images/button__icon.svg");
  }

  /*_handleOpenAndCloseImage(evt) {
    const popupViewImg = document.querySelector(".popup-view-image");

    popupViewImg.classList.toggle("popup_opened");
    popupViewImg.querySelector(".popup-view-image__image").src = evt.target.src;
    popupViewImg.querySelector(".popup-view-image__image").alt = evt.target.alt;
    popupViewImg.querySelector(".popup-view-image__title").textContent =
      evt.target.alt;

    const closePopupImage = popupViewImg.querySelector(
      ".popup-view-image__close-button"
    );
    closePopupImage.addEventListener("click", () => {
      popupViewImg.classList.remove("popup_opened");
    });
  }*/
}
