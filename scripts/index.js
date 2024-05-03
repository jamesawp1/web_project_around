const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close-button");
editButton.addEventListener("click", function () {
  popup.classList.toggle("popup_opened");
});
closePopupButton.addEventListener("click", function () {
  popup.classList.toggle("popup_opened");
  closePopupButton.removeEventListener();
});

const formElement = document.querySelector(".popup__form");
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector("#input-name");
  let jobInput = document.querySelector("#input-job");
  const profileName = document.querySelector(".profile__title");
  const profileJob = document.querySelector(".profile__subtitle");
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.toggle("popup_opened");
}
formElement.addEventListener("submit", handleProfileFormSubmit);
