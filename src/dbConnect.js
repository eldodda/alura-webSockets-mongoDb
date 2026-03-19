import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient(process.env.MONGODB_CONN_STR);

let documentosColecao;

try {
	await client.connect();
	const db = client.db("alura-websockets");
	documentosColecao = db.collection("documentos");
	console.log("Conectado ao MongoDB com sucesso.");
	
} catch (err) {
	console.log(err);	
}

export { documentosColecao };