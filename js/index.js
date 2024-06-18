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

      console.log("Dados enviados:", { email: email, senha: senha });

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

        console.log(response);

        if (response.ok) {
          const data = await response.json();
          const token = data.token;

          localStorage.setItem("jwt", token);
          alert("Login realizado com sucesso!");
          window.location.href = "../pages/lembretes/lembretes.html";
        } else {
          const errorData = await response.json();
          console.log("errorData", errorData);
          alert(`Erro ao cadastrar: ${errorData.msg}`);
        }
      } catch (error) {
        console.error("Erro ao realizar o login:", error);
        alert("Erro ao realizar o login. Tente novamente mais tarde.");
      }
    });
});
