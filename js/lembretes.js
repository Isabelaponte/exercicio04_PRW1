import { baseURL } from "./utils.js";

async function getLembretes() {
  const token = localStorage.getItem("jwt");

  if (token) {
    try {
      const response = await fetch(`${baseURL}/lembretes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Dados retornados:", data);
        return data;
      }

    } catch (error) {
      console.error("Erro ao obter os lembretes:", error.message);
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const lembretes = await getLembretes();

  console.log("Lembretes:", lembretes);
});