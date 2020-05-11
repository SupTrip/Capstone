import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";
import "./styles/resets.scss";

import { performAction } from "./js/app";

//document.getElementById('generate').addEventListener('click',performAction)
window.addEventListener("DOMContentLoaded", (_) => {
  document.getElementById("button").addEventListener("click", performAction);
});

console.log("CHANGE!!");

export { performAction };
