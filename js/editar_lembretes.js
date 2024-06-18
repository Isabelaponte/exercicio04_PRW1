import { checkUserLoggedIn, getLembreteById, updateLembrete } from "./utils.js";

document.addEventListener("DOMContentLoaded", async function () {
  checkUserLoggedIn();

  const lembreteId = window.location.search.split("=")[1]

  if (lembreteId) {
    getLembreteById(lembreteId).then((lembrete) => {
      const lembreteTexto = document.querySelector("#lembrete")
      lembreteTexto.value = lembrete.texto
    })
  }

  const formSubmit = document.querySelector("form")
  formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault()

    const lembreteTexto = document.querySelector("#lembrete").value
    const lembreteId = window.location.search.split("=")[1]

    const buttonSubmit = document.querySelector("button")
    buttonSubmit.disabled = true

    try {
      await updateLembrete(lembreteId, lembreteTexto)
      window.location.href = "/pages/lembretes/lembretes.html"
    } catch (error) {
      console.error("Erro ao atualizar lembrete:", error.message);
    }
  })
})