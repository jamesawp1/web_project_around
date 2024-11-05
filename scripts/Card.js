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

class Card {
  constructor(data, selector) {
    this._text = data.text;
    this._image = data.image;
    this._selector = selector;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getElement();

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
      .addEventListener("click", () => {
        this._handleDeleteButtonClick();
      });

    this._element
      .querySelector(".gallery__like-button")
      .addEventListener("click", (evt) => {
        this._handleLikeButtonClick(evt);
      });
  }

  _handleDeleteButtonClick() {
    this._element
      .querySelector(".gallery__delete-button")
      .closest(".gallery__card")
      .remove();
  }

  _handleLikeButtonClick(evt) {
    if (evt.target.getAttribute("src") === "./images/button__icon.svg") {
      return evt.target.setAttribute("src", "./images/button__icon_active.svg");
    }
    return evt.target.setAttribute("src", "./images/button__icon.svg");
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, "#template");

  const cardElement = card.generateCard();

  document.querySelector(".gallery").append(cardElement);
});
