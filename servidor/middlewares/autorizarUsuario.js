import jwt from "jsonwebtoken";

function autorizarUsuario (socket, next) {
	const tokenJwt = socket.handshake.auth.token;
	try {
		const payloadToken = jwt.verify(tokenJwt, process.env.JWT_SECRET);
		socket.payloadToken = payloadToken;
		next();
	} catch (err) {
		next(err);
	}
}

export default autorizarUsuario;

