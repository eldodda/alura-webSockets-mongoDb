import { atualizaDocumento, encontrarDocumento, excluirDocumento } from "../db/documentosDb.js";
import { adicionarConexao, encontrarConexao, obterUsuariosDoc, removerConexao } from "../utils/conexoesDocs.js";

function registrarDocumento(socket, io) {
	socket.on("selecionar_documento", async ({ nomeDocumento, nomeUsuario }, devolverTexto) => {
		const documento = await encontrarDocumento(nomeDocumento);
		
		if (documento) {
			const conexaoEncontrada = encontrarConexao(nomeDocumento, nomeUsuario);
			if (!conexaoEncontrada) {
				socket.join(nomeDocumento);
	
				socket.nomeDocumento = nomeDocumento;
				socket.nomeUsuario = nomeUsuario;
	
				adicionarConexao({ nomeDocumento, nomeUsuario: nomeUsuario });
				
				const usuariosNoDocumento = obterUsuariosDoc(nomeDocumento);
				io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
				
				devolverTexto(documento.texto);
			} else {
				socket.emit("usuario_existente");
			}

		}

	});
	
	socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
		const atualizacao = await atualizaDocumento(nomeDocumento, texto);
	
		if (atualizacao.modifiedCount) {
			socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
		}
	});
	
	socket.on("excluir_documento", async (nome) => {
		const resultado = await excluirDocumento(nome);
	
		if (resultado.deletedCount) {
			io.emit("excluir_documento_sucesso", nome);
		}
	});
	
	socket.on("disconnect", () => {
		const { nomeDocumento, nomeUsuario } = socket;
		removerConexao(nomeDocumento, nomeUsuario);
	
		const usuariosNoDocumento = obterUsuariosDoc(nomeDocumento);
		io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
	});

}

export default registrarDocumento;