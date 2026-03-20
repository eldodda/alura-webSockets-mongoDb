/* eslint-disable no-undef */
import { emitirAdicionarDoc } from "./socket-front-index.js";

const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDoc = document.getElementById("input-documento");

form.addEventListener("submit", (evento) => {
	evento.preventDefault();
	emitirAdicionarDoc(inputDoc.value);
	inputDoc.value = "";
});


function inserirLinkDocumento(nomeDoc) {
	listaDocumentos.innerHTML += `
	<a 
	href="documento.html?nome=${nomeDoc}" 
	class="list-group-item list-group-item-action"
	id="documento-${nomeDoc}"
	>
	${nomeDoc}
      </a>
	`;
}

function removerLinkDoc(nomeDoc) {
	const documento = document.getElementById(`documento-${nomeDoc}`);
	listaDocumentos.removeChild(documento);
}

export { inserirLinkDocumento, removerLinkDoc };