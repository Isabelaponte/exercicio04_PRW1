import { baseURL, checkUserLoggedIn, formatDate } from "./utils.js";

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


async function deleteLembrete(id) {
  checkUserLoggedIn();

  const response = await fetch(`${baseURL}/lembrete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  return response;
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
    cardDate.textContent = formatDate(lembrete.data);

    const cardActionEdit = document.createElement("a");
    cardActionEdit.classList.add("btn", "btn-warning");
    cardActionEdit.href = "./editar_lembrete.html?id=" + lembrete.id;
    cardActionEdit.textContent = "Editar";

    const cardActionDelete = document.createElement("button");
    cardActionDelete.classList.add("btn", "btn-danger");
    cardActionDelete.setAttribute("data-toggle", "modal");
    cardActionDelete.setAttribute("data-target", "#exampleModal");
    cardActionDelete.textContent = "Excluir";

    cardActionDelete.addEventListener("click", () => {
      const bootstrapModal = new bootstrap.Modal(document.getElementById("deleteModal"));
      bootstrapModal.show();

      const confirmButton = document.querySelector("#deleteModal .btn-danger");
      confirmButton.addEventListener("click", async () => {
        const response = await deleteLembrete(lembrete.id);
        if (response.ok) {
          const lembretes = document.querySelector(".lembretes");
          lembretes.removeChild(card);

          if (lembretes.childElementCount === 0) {
            const noLembretes = document.createElement("p");
            noLembretes.classList.add("lead");
            noLembretes.textContent = "Você ainda não adicionou nenhum lembrete.";

            document.querySelector(".lembretes").appendChild(noLembretes);
          }
        }
      })
    });

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

  if (lembretes.length === 0) {
    const noLembretes = document.createElement("p");
    noLembretes.classList.add("lead");
    noLembretes.textContent = "Você ainda não adicionou nenhum lembrete.";

    document.querySelector(".lembretes").appendChild(noLembretes);
  }
});