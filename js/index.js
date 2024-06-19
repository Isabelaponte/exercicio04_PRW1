import { checkUserLoggedIn, baseURL } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  checkUserLoggedIn();

  if (window.location.search.includes("loggedOut=true")) {
    alert("Sua sessão foi encerrada. Por favor, faça login novamente.");
    window.location.href = "/pages/index.html";
  }

  document
    .getElementById("loginForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      try {
        const response = await fetch(`${baseURL}/usuario/login`, {
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
          alert("Login realizado com sucesso!");
          window.location.href = "../pages/lembretes/lembretes.html";
        } else {
          const errorData = await response.json();
          alert(`Erro ao cadastrar: ${errorData.msg}`);
        }
      } catch (error) {
        console.error("Erro ao realizar o login:", error);
        alert("Erro ao realizar o login. Tente novamente mais tarde.");
      }
    });
});
