export const baseURL = "https://ifsp.ddns.net/webservices/lembretes";

const publicRoutes = ["index.html", "cadastrar.html"];

export async function checkUserLoggedIn() {
  const token = localStorage.getItem("jwt");

  if (token) {
    try {
      const response = await fetch(`${baseURL}/usuario/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.json();

      if (data.msg === "Você está logado") {
        window.location.href = "../pages/lembretes/lembretes.html";
      }

      localStorage.removeItem("jwt");
      window.location.href = "./index.html?loggedOut=true";


    } catch (error) {
      console.error("Erro ao verificar o login:", error.message);
    }
  } else {
    document.getElementById("loadingIndicator").classList.add("hidden");
    document.getElementById("main").classList.remove("hidden");
    if (!publicRoutes.includes(window.location.pathname)) {
      window.location.href = "./index.html";
    }
  }
}