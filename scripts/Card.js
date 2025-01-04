export default class Card {
  constructor(
    data,
    selector,
    { handleCardClick },
    { handleDeleteCard },
    { handleLikeButton },
    { handleDislikeButton }
  ) {
    this._data = data;
    this._text = data.name;
    this._image = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this.handleDeleteCard = handleDeleteCard;
    this.handleLikeButton = handleLikeButton;
    this.handleDislikeButton = handleDislikeButton;
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

    this._likeButton = this._element.querySelector(".gallery__like-icon");
    this._likeButtonActive = new URL(
      "../images/button__icon_active.svg",
      import.meta.url
    );
    this._likeButtonInactive = new URL(
      "../images/button__icon.svg",
      import.meta.url
    );

    if (this._data.isLiked) {
      this._likeButton.setAttribute("src", `${this._likeButtonActive}`);
    } else if (!this._data.isLiked) {
      this._likeButton.setAttribute("src", `${this._likeButtonInactive}`);
    }

    return this._element;
  }

  _setEventListeners() {
    /*this._element
      .querySelector(".gallery__delete-button")
      .addEventListener("click", (evt) => {
        this._handleDeleteButtonClick(evt);
      });*/

    this._element
      .querySelector(".gallery__delete-button")
      .addEventListener("click", (evt) => {
        this.handleDeleteCard(evt);
      });

    this._element
      .querySelector(".gallery__like-button")
      .addEventListener("click", () => {
        this._turnOnLikeButton();
      });

    this._element
      .querySelector(".gallery__card-image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  _turnOnLikeButton() {
    this._likeIconSource = this._likeButton.getAttribute("src");
    if (this._likeButtonInactive.href.includes(this._likeIconSource)) {
      this._likeButton.setAttribute("src", this._likeButtonActive);
      this.handleLikeButton();
    } else {
      this._likeButton.setAttribute("src", this._likeButtonInactive);
      this.handleDislikeButton();
    }
  }

  /*_handleDeleteButtonClick(evt) {
    evt.target.closest(".gallery__card").remove();
  }*/

  /*_handleLikeButtonClick(evt) {
    if (evt.target.getAttribute("src") === "./images/button__icon.svg") {
      return evt.target.setAttribute("src", "./images/button__icon_active.svg");
    }
    return evt.target.setAttribute("src", "./images/button__icon.svg");
  }*/
}
