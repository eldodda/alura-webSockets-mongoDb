/* eslint-disable no-undef */
import { emitirExcluir, emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");
const tituloDocumento = document.getElementById("titulo-documento");
const butExcluir = document.getElementById("excluir-documento");
const textoEditor = document.getElementById("editor-texto");

tituloDocumento.textContent = nomeDocumento || "Documento sem título";
selecionarDocumento(nomeDocumento);


textoEditor.addEventListener("keyup", () => {
	emitirTextoEditor({
		texto: textoEditor.value, 
		nomeDocumento
	});
});

function atualizaTextoEditor(texto) {
	textoEditor.value = texto;
}

butExcluir.addEventListener("click", () => {
	emitirExcluir(nomeDocumento);
});


function alertaRedirect(nome) {
	if (nome === nomeDocumento) {
		alert(`Documento ${nome} excluído.`);
		window.location.href = "/";
	}
}

export { atualizaTextoEditor, alertaRedirect };
