import { checkUserLoggedIn, baseURL } from "./utils.js";

async function postLembretes(e){
    e.preventDefault()


    let textoLembrete = document.querySelector("#lembrete").value

  try{
    let resposta = await fetch(`${baseURL}/lembrete`, {
      method : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
      body : JSON.stringify({
        texto : textoLembrete
      })
    })

    console.log("texto");
    window.location.href = "/pages/lembretes/lembretes.html"
  }

  catch(erro){
  console.error("Deu ruim", erro);
}
}

document.addEventListener("DOMContentLoaded", async () => {
    const formSubmit = document.querySelector("form")
    formSubmit.addEventListener("submit",postLembretes)

})