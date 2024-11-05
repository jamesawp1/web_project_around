class Card {
  constructor(text, image, selector) {
    this._text = text;
    this._image = image;
    this._selector = selector;
  }

  _getElement() {
    const cardElement = document
      .querySelector("#template")
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
}
