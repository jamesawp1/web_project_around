const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close-button");

editButton.addEventListener("click", () => {
  popup.classList.add("popup_opened");
  validationForm(
    "#input-name",
    "#input-role",
    "#input-name-error",
    "#input-role-error",
    "#save-button"
  );

  closePopupButton.addEventListener("click", () => {
    popup.classList.remove("popup_opened");
    closePopupButton.removeEventListener();
  });
});

popup.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup")) {
    popup.classList.remove("popup_opened");
  }
});
