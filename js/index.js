import { checkUserLoggedIn, baseURL } from "./utils.js";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,

});


document.addEventListener("DOMContentLoaded", () => {
  checkUserLoggedIn();

  if (window.location.search.includes("loggedOut=true")) {
    Toast.fire({
      title: "Sua sessão foi encerrada. Por favor, faça login novamente.",
      icon: "error"
    })
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
          Toast.fire({
            title: "Login realizado com sucesso!",
            icon: "success"
          }).then(() => {
            window.location.href = "../pages/lembretes/lembretes.html";
          })
        } else {
          const errorData = await response.json();
          Toast.fire({
            title: `Erro ao cadastrar: ${errorData.msg}`,
            icon: "error"
          })
        }
      } catch (error) {
        console.error("Erro ao realizar o login:", error);
        Toast.fire({  
          title: "Erro ao realizar o login. Tente novamente mais tarde.",
          icon: "error"
        })
      }
    });
});
