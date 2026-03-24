import { MongoClient } from "mongodb";
import "dotenv/config";

const cliente = new MongoClient(process.env.MONGODB_CONN_STR);

let documentosColecao, usuariosColecao;

try {
	await cliente.connect();

	const db = cliente.db("alura-websockets");
	documentosColecao = db.collection("documentos");
	usuariosColecao = db.collection("usuarios");

	console.log("Conectado ao MongoDB de dados com sucesso!");
} catch (erro) {
	console.log(erro);
}

export { documentosColecao, usuariosColecao };
