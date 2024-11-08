export class Card {
  constructor(data, selector) {
    this._text = data.name;
    this._image = data.link;
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
}
