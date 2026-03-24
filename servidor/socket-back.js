import "dotenv/config";
import io from "./servidor.js";
import registrarEventosDocumento from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrarEventoCadastro from "./registrarEventos/cadastro.js";
import registrarEventosLogin from "./registrarEventos/login.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

const nspUsuarios = io.of("/usuarios");

nspUsuarios.use(autorizarUsuario);
nspUsuarios.on("connection", (socket) => {
	registrarEventosInicio(socket, nspUsuarios);
	registrarEventosDocumento(socket, nspUsuarios);
});

io.of("/").on("connection", (socket) => {
	registrarEventosLogin(socket, io);
	registrarEventoCadastro(socket, io);
});