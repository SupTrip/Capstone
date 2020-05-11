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

<<<<<<< HEAD
=======
import {  performAction} from "./js/app";

 //document.getElementById('generate').addEventListener('click',performAction)
window.addEventListener('DOMContentLoaded', _ =>{
	document.getElementById('generate').addEventListener('click',performAction);
});
alert("I EXIST")
>>>>>>> 40d2698c402768d1ceb02b9a2c0d258a6c9ac0cc
console.log("CHANGE!!");

export { performAction };
