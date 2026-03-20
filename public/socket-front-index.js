/* eslint-disable no-undef */
import { inserirLinkDocumento, removerLinkDoc } from "./index.js";

const socket = io();

socket.emit("obter_documentos", (documentos) => {
	documentos.forEach((documento) => {
		inserirLinkDocumento(documento.nome);
	});
});

function emitirAdicionarDoc(nome) {
	socket.emit("adicionar_doc", nome);
};

socket.on("adicionar_doc_interface", (nome) => {
	inserirLinkDocumento(nome);
});

socket.on("doc_existente", (nome) => {
	alert(`O documento ${nome} já existe.`);
	
});

socket.on("excluir_doc_ok", (nome) => {
	removerLinkDoc(nome);
});

export { emitirAdicionarDoc };