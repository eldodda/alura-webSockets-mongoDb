/* eslint-disable no-undef */
import { definirCookie } from "../utils/cookies.js";

const socket = io();

function emitAuth(dados) {
	socket.emit("autenticar_usuario", dados);
}

socket.on("autenticacao_sucesso", (tokenJwt) => {
	definirCookie("tokenJwt", tokenJwt);
	alert("Usuário autenticado com sucesso.");
	window.location.href = "/";
});
socket.on("autenticacao_erro", () => alert("Erro ao autenticar usuário."));
socket.on("usuario_inexistente", () => alert("Este usuário não existe."));

export { emitAuth };