import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = process.env.port || 3000;

const caminhoAtual = url.fileURLToPath(import.meta.url);
const dirPub = path.join(caminhoAtual, "../..", "public");
app.use(express.static(dirPub));

const servidorHttp = http.createServer(app);

servidorHttp.listen(port, () => console.log(`Servidor escutando na porta ${port}.`));

const io = new Server(servidorHttp);

export default io;