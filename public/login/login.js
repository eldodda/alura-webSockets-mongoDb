/* eslint-disable no-undef */
import { emitAuth } from "./socket-front-login.js";

const form = document.getElementById("form-login");

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const nome = form["input-usuario"].value;
	const senha = form["input-senha"].value;
	emitAuth({ nome, senha });
});