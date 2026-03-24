import criaHash from "../utils/criaHash.js";
import { usuariosColecao } from "./dbConnect.js";

function encontrarUsuario(nome) {
	return usuariosColecao.findOne({ nome });
}

function cadastrarUsuario({ nome, senha }) {
	const { hash, sal } = criaHash(senha);
	return usuariosColecao.insertOne({ nome, hash, sal });
}

export { cadastrarUsuario, encontrarUsuario };