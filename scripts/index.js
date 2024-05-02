const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close-button");

editButton.addEventListener("click", () => {
  popup.classList.add("popup_opened");
});

closePopupButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
  closePopupButton.removeEventListener();
});

const formElement = document.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector("#input-name");
  const roleInput = document.querySelector("#input-role");
  const profileName = document.querySelector(".profile__title");
  const profileRole = document.querySelector(".profile__subtitle");
  profileName.textContent = nameInput.value;
  profileRole.textContent = roleInput.value;
  popup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", handleProfileFormSubmit);
