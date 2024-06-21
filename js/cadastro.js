import { checkUserLoggedIn, baseURL } from "./utils.js";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,

});


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
          Toast.fire({
            title: "Cadastro realizado com sucesso!",
            icon: "success"
          }).then(() => {
            window.location.href = "/pages/index.html";
          })
        } else {
          Toast.fire({
            title: `Erro ao cadastrar: ${errorData.msg}`,
            icon: "error"
          })
        }
      } catch (error) {
        console.error("Erro ao realizar o cadastro:", error);
        Toast.fire({
          title: "Erro ao realizar o cadastro. Tente novamente mais tarde.",
          icon: "error"
        })
      }
    });
});
