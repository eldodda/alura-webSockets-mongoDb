/* eslint-disable no-undef */
const socket = io();

function emitCadastro(dados) {
	socket.emit("cadastrar_usuario", dados);
}

socket.on("cadastro_sucesso", () => alert("Cadastro realizado com sucesso."));
socket.on("erro", () => alert("Erro ao cadastrar usuário."));
socket.on("usuario_ja_existente", () => alert("Usuário já existe."));

export { emitCadastro };