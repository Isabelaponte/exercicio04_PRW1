import { checkUserLoggedIn, baseURL } from "./utils.js";

document.addEventListener("DOMContentLoaded", function () {
  checkUserLoggedIn();

  document
    .getElementById("cadastroForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      try {
        const response = await fetch(`${baseURL}/usuario/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: email,
            senha: senha,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const token = data.token;

          localStorage.setItem("jwt", token);
          alert("Cadastro realizado com sucesso!");
          window.location.href = "/pages/index.html";
        } else {
          alert(`Erro ao cadastrar: ${errorData.msg}`);
        }
      } catch (error) {
        console.error("Erro ao realizar o cadastro:", error);
        alert("Erro ao realizar o cadastro. Tente novamente mais tarde.");
      }
    });
});
