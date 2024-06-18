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

      const data = await response.json();

      if (data.msg === "Você está logado") {
          if (!window.location.pathname.includes("lembretes")) {
            window.location.href = "/pages/lembretes/lembretes.html";
          }
          return;
      }

      localStorage.removeItem("jwt");
      window.location.href = "/pages/index.html?loggedOut=true";

    } catch (error) {
      console.error("Erro ao verificar o login:", error.message);
    }
  } else {
    const loadingIndicator = document.getElementById("loadingIndicator");
    if (loadingIndicator) loadingIndicator.classList.add("hidden");
    const main = document.getElementById("main");
    if (main) main.classList.remove("hidden");
    
    const route = window.location.pathname.split("/");
    if (!publicRoutes.includes(route[route.length - 1])) {
      window.location.href = "/pages/index.html";
    }
  }
}