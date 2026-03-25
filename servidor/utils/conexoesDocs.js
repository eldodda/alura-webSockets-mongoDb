const conexoesDocs = [];

function encontrarConexao(nomeDocumento, nomeUsuario) {
	return conexoesDocs.find((conexao) => {
		return (conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario);	
	});
}

function adicionarConexao(conexao) {
	conexoesDocs.push(conexao);	
}

function obterUsuariosDoc(nomeDoc) {
	return conexoesDocs
		.filter((conexao) => conexao.nomeDocumento === nomeDoc)
		.map((conexao) => conexao.nomeUsuario);
}

function removerConexao(nomeDocumento, nomeUsuario) {
	const index = conexoesDocs.findIndex((conexao) => {
		return (conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario);	
	});
	
	if (index !== -1) {
		conexoesDocs.splice(index, 1);
	}	
	console.log(conexoesDocs);
	
}

export { 
	adicionarConexao,
	obterUsuariosDoc,
	removerConexao,
	encontrarConexao
};
