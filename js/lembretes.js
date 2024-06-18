import { baseURL, checkUserLoggedIn } from "./utils.js";

async function getLembretes() {
  checkUserLoggedIn();
}

document.addEventListener("DOMContentLoaded", async () => {
  const lembretes = await getLembretes();

  console.log("Lembretes:", lembretes);
});