import { baseURL, checkUserLoggedIn } from "./utils.js";

async function getLembretes() {
  checkUserLoggedIn();

  const response = await fetch(`${baseURL}/lembrete`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  const lembretes = await response.json();

  return lembretes;
}

document.addEventListener("DOMContentLoaded", async () => {
  const lembretes = await getLembretes();

  for (const lembrete of lembretes) {
    const card = document.createElement("li");
    card.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = lembrete.texto;

    const cardDate = document.createElement("p");
    cardDate.classList.add("card-date");
    cardDate.textContent = lembrete.data;

    const cardActionEdit = document.createElement("a");
    cardActionEdit.classList.add("btn", "btn-warning");
    cardActionEdit.href = "./editar_lembrete.html?id=" + lembrete.id;
    cardActionEdit.textContent = "Editar";

    const cardActionDelete = document.createElement("button");
    cardActionDelete.classList.add("btn", "btn-danger");
    cardActionDelete.textContent = "Excluir";

    cardBody.appendChild(cardText);
    cardBody.appendChild(cardDate);
    cardBody.appendChild(cardActionEdit);
    cardBody.appendChild(cardActionDelete);

    card.appendChild(cardBody);

    document.querySelector(".lembretes").appendChild(card);
  }

  const loadingIndicator = document.getElementById("loadingIndicator");
  if (loadingIndicator) loadingIndicator.classList.add("hidden");
  const lembretesList = document.querySelector(".lembretes");
  if (lembretesList) lembretesList.classList.remove("hidden");
});