import { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDoc } from "./documentosDb.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
	socket.on("obter_documentos", async (devolverDocumentos) => {
		const documentos = await obterDocumentos();
		devolverDocumentos(documentos);
	});

	socket.on("adicionar_doc", async (nome) => {
		const docExiste = (await encontrarDocumento(nome)) !== null;
		if (docExiste) {
			socket.emit("doc_existente", nome);
		} else {
			const resultado = await adicionarDocumento(nome);	
			if (resultado.acknowledged) {
				io.emit("adicionar_doc_interface", nome);
			}
		}
	});

	socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
		socket.join(nomeDocumento);

		const documento = await encontrarDocumento(nomeDocumento);
		
		if (documento) {
			devolverTexto(documento.texto);
		}
	});

	socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
		const atualizacao = await atualizaDocumento(nomeDocumento, texto);
		
		if (atualizacao.modifiedCount) {
			socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
		}
	});

	socket.on("excluir_documento", async (nome) => {
		const resultado = await excluirDoc(nome);
		if (resultado.deletedCount) {
			io.emit("excluir_doc_ok", nome);
		}		
	});

});

