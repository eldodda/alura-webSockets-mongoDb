import { scryptSync, timingSafeEqual } from "crypto";

function autenticarUsuario(senha, usuario) {
	const hashTest = scryptSync(senha, usuario.sal, 64);
	const hash = Buffer.from(usuario.hash, "hex");
	const autenticado = timingSafeEqual(hashTest, hash);
	return autenticado;
}

export default autenticarUsuario;