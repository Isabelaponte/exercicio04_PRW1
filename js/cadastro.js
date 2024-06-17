let baseURL = "https://ifsp.ddns.net/webservices/lembretes/";

async function checkUserLoggedIn() {
  const token = localStorage.getItem("jwt");

  if (token) {
    try {
      const response = await fetch(`${baseURL}usuario/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response)

      if (response.ok) {
        const data = await response.json();
        if (data.msg === "Você está logado") {
          window.location.href = "../pages/lembretes/lembretes.html";
        }
      } else {
        document.getElementById("loadingIndicator").classList.add("hidden");
        document.getElementById("main").classList.remove("hidden");
      }
    } catch (error) {
      console.error("Erro ao verificar o login:", error);
    }
  }
}

function showForm() {
  document.getElementById("loadingIndicator").classList.add("hidden");
  document.getElementById("loginFormContainer").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
  checkUserLoggedIn();

  document
    .getElementById("cadastroForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      console.log("Dados enviados:", { email: email, senha: senha });

      try {
        const response = await fetch(`${baseURL}usuario/signup`, {
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
          alert("Cadastro realizado com sucesso!");
          window.location.href = "./index.html";
        } else {
          const errorData = await response.json();
          alert(`Erro ao cadastrar: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Erro ao realizar o cadastro:", error);
        alert("Erro ao realizar o cadastro. Tente novamente mais tarde.");
      }
    });
});
