const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close-button");

editButton.addEventListener("click", () => {
  popup.classList.add("popup_opened");

  closePopupButton.addEventListener("click", () => {
    popup.classList.remove("popup_opened");
  });
});

// Vamos encontrar o formulário no DOM

const formElement = document.querySelector(".popup__form");

// Em seguida vem o handler do submit
// ainda não vai enviar para lugar nenhum

// Observe que o nome da função começa com um verbo
// e descreve exatamente o que a função faz
function handleProfileFormSubmit(evt) {
  // Esta linha impede o navegador
  // de enviar o formulário da forma padrão.
  evt.preventDefault();
  // Fazendo isso, podemos definir nossa própria forma de enviar o formulário.
  // Explicaremos em mais detalhes posteriormente.

  // Vamos encontrar os campos de formulário do DOM
  const nameInput = document.querySelector("#input-name");
  const roleInput = document.querySelector("#input-role");

  // Pegue os valores de cada campo do valor da propriedade correspondente
  const name = nameInput.value;
  const role = roleInput.value;
  // Selecione os elementos aos quais os valores dos campos serão inseridos
  const editedName = document.querySelector(".profile__title");
  const editedRole = document.querySelector(".profile__subtitle");
  // Insira novos valores usando a
  // propriedade textContent
  editedName.textContent = name;
  editedRole.textContent = role;
}

// Conecte o handler ao formulário:
// ele vai observar o evento de submit

//formElement.addEventListener("submit", handleProfileFormSubmit);
formElement.addEventListener("submit", (handleProfileFormSubmit) => {
  popup.classList.remove("popup_opened");
});
